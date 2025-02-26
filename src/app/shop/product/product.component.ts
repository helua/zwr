import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getCart, getOrderId, setOrderId, getCheckoutButton, setCheckoutButton, getToken, setCart } from 'src/app/localStorage';
import { FeedService } from 'src/app/feed.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product, token } from '../../shop/Product';
import { TokenService } from 'src/app/token.service';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // encapsulation: ViewEncapsulation.None,

})
export class ProductComponent implements OnInit {

  product: any;
  // token: any;
  ord: string = '';
  cart: any;
  // @Output() updateCart = new EventEmitter<any>();

  checkout: string = 'https://checkout.zwr.waw.pl/';
  cartIcon = faCartPlus;
  arrowIcon = faArrowLeft;
  title: string ='';
  productRaw: any = {};
  badgeHidden: boolean = true;
  token: any = token;
  selectedOption: any;

  constructor(
    private tok: TokenService,
    private ecomm: EcommerceService,
    private http: FeedService,
    private route: ActivatedRoute,
    private location: Location,
    private feed: FeedService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(){

    this.ord = getOrderId();
    // console.log(this.ord);
    this.cart = JSON.parse(getCart());
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
    // this.token = JSON.parse(getToken());
    if(this.token == null){
      this.tok.getToken()
      // this.token = JSON.parse(getToken());
    }
    this.sanityAndCommerceLayer();
  }
  createPricePerNight(input: string): number {
    return Math.floor(parseFloat(input.slice(0, -6).replace(' ', '').replace(',', '.')) / 3 * 10 ) / 10 ;
  }
  sanityAndCommerceLayer(){
    this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.http.getProduct(params.get('id')))).subscribe( product => {
        this.productRaw = product;
          if(product){
            this.product = this.feed.workResult(this.productRaw.result[0]);
          }
          this.ecomm.getPrices(this.token.access_token).subscribe(pr => {
            if(pr){
              for (let i = 0; i < pr.included.length; i++){
                if(this.product.sku === pr.included[i].attributes.sku_code){
                  this.product.price = pr.included[i].attributes.formatted_amount;
                }
              }
            }
          })
          this.ecomm.getStock(this.token.access_token).subscribe(pr => {
            if(pr){
              for (let i = 0; i < pr.data.length; i++){
                if(this.product.sku === pr.data[i].attributes.sku_code){
                  this.product.stock = pr.data[i].attributes.quantity;
                }
              }
            }
          })
          this.ecomm.getOptions(this.token.access_token).subscribe(o => {
            if(o){
              for (let i = 0; i < o.data.length; i++){
                // RegEx opcji każdego SKU
                var re = new RegExp(o.data[i].attributes.sku_code_regex);
                // sprawdzam czy RegEx opcji pasuję do SKU code
                  if(this.product.sku && re.test(this.product.sku)){
                    // Jeśli pasuje to przygotowuję objekt dla znalezionych opcji
                    let option = {optionId: o.data[i].id, optionName: o.data[i].attributes.name}
                    // Sprawdzam czy produkt już miał tablicę z opcjami, tworzę ją i wpycham tam znalezione opcje
                    if(!this.product.options){
                      this.product.options = [];
                      this.product.options?.push(option);
                    }
                    else{
                      this.product.options?.push(option);
                    }
                  }
                //////////

                // console.log(o.data[i].attributes.name);
                // console.log(option);
                // let option = {optionId: o.data[i].id, optionName: o.data[i].attributes.name}
                // Sprawdzam czy produkt już miał tablicę z opcjami, tworzę ją i wpycham tam znalezione opcje
                // if(!this.product.options){
                //     this.product.options = [];
                //     this.product.options?.push(option);
                //   }
                // else{
                //   this.product.options?.push(option);
                // }
                //comment out na próbę
              }
            }
          })
        // SEO function niepotrzebne
        // this.title = this.product.title;
        // this.titleService.setTitle(this.title);
        // this.description = {name: 'description', content: this.post.meta};
        // this.metaService.updateTag(this.description);
      })
  }
  createOrder(){
    if(!this.ord){
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(or => {
        this.ord = or.data.id;
        console.log(this.ord)
        setOrderId(this.ord);
        console.log('nowe zamówienie')
        this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(
          {
            next: (r) => {
              if(this.selectedOption){
                this.ecomm.addLineItemOptions(this.token.access_token, r.data.id, this.selectedOption.optionId, this.selectedOption.optionName).subscribe(op => {
                  this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                    // this.updateCart.emit({cart: c, ord: this.ord});
                    console.log({cart: c, ord: this.ord})
                    this.cart = c;
                    setCart(c);
                    setCheckoutButton(true.toString());
                    this.openSnackBar('Added to cart', 'Open cart');
                    var isTrueSet = (getCheckoutButton() === 'false');
                    this.badgeHidden = isTrueSet;
                  });
                })
              }
              else{
                this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                  // this.updateCart.emit({cart: c, ord: this.ord});
                  this.cart = c;
                  setCart(c);
                  setCheckoutButton(true.toString());
                  this.openSnackBar('Added to cart', 'Open cart');
                  var isTrueSet = (getCheckoutButton() === 'false');
                  this.badgeHidden = isTrueSet;
                });
              }
            },
            error: (err) => {
              alert(err.error.errors[0].title);
            }
          }
        );
      });
    }
    if(this.ord){
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(
        {
          next: (r) => {
            if(this.selectedOption){
              this.ecomm.addLineItemOptions(this.token.access_token, r.data.id, this.selectedOption.optionId, this.selectedOption.optionName).subscribe(op => {
                this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                  // this.updateCart.emit({cart: c, ord: this.ord});
                  console.log({cart: c, ord: this.ord})
                  this.cart = c;
                  setCart(c);
                  setCheckoutButton(true.toString());
                  this.openSnackBar('Added to cart', 'Open cart');
                  var isTrueSet = (getCheckoutButton() === 'false');
                  this.badgeHidden = isTrueSet;
                });
              })
            }
            else{
              this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                // this.updateCart.emit({cart: c, ord: this.ord});
                this.cart = c;
                setCart(c);
                setCheckoutButton(true.toString());
                this.openSnackBar('Added to cart', 'Open cart');
                var isTrueSet = (getCheckoutButton() === 'false');
                this.badgeHidden = isTrueSet;
              });
            }
          },
          error: (err) => {
            alert(err.error.errors[0].title);
          }
        }
      );

    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '466px',
      maxWidth: '97vw',
      data: { ord: this.ord },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cart = JSON.parse(getCart());
      this.ord = getOrderId();
    });
  }
  openSnackBar(message: string, action: string) {
    let ref = this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    ref.onAction().subscribe(() => {
      this.openDialog();
    });
  }
  goBack(){
    this.location.back();
  }
}

