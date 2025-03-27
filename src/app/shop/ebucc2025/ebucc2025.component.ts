import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { FeedService } from 'src/app/feed.service';
import { clear, getCart, getCheckoutButton, getOrderId, getToken, setCart, setCheckoutButton, setOrderId } from 'src/app/localStorage';
import { Product, token } from 'src/app/shop/Product';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ebucc-2025',
  templateUrl: './ebucc2025.component.html',
  styleUrls: ['./ebucc2025.component.scss']
})
export class Ebucc2025Component implements OnInit {
  cartIcon = faShoppingCart;
  productsRaw: any;
  products: Product[] = [];
  // token: any;
  prices: any = [];
  ord: string = '';
  cart: any;
  badgeHidden: boolean = true;
  checkout: string = 'https://checkout.zwr.waw.pl/';
  token: any = token;
  title = 'EBUCC 2025 Accommodation';
  description: MetaDefinition = { name: 'description', content: 'Book your team stay at EBUCC 2025 1km from the beach' };  
  beds: number = 0;
  
  constructor(
    private feed: FeedService,
    private ecomm: EcommerceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private titleService: Title,
    private metaService: Meta) { }

  ngOnInit(): void {
    // clear;
    this.ord = getOrderId();
    this.cart = JSON.parse(getCart());
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
    //Commerce Layer Token temporary desactivated
    // this.token = JSON.parse(getToken());
    this.sanityAndCommerceLayer();
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
    this.metaService.addTags([
      {property: 'og:image', content: 'https://zwr.waw.pl/assets/ebucc-cover.jpg'}
    ]);
  }
  sanityAndCommerceLayer(){
    //Sanity
    this.feed.getAcco().subscribe( products => {
      this.productsRaw = products;
      // console.log(this.productsRaw)
      for (let i = 0; i < this.productsRaw.result.length; i++){
        this.products.push(this.feed.workResult(this.productsRaw.result[i]));
      }
      //Commerce Layer data & synchro
      if(this.token){
        this.ecomm.getPrices(this.token.access_token).subscribe(p => {
          // console.log(p)
          if(p){
            for (let i = 0; i < p.included.length; i++){
              this.products.map((sku) => {
                if(sku.sku === p.included[i].attributes.sku_code){
                  this.products.filter(a => sku.sku === a.sku)[0].price = p.included[i].attributes.formatted_amount;
                }
              })
            }
          }
        });
        this.ecomm.getStock(this.token.access_token).subscribe(p => {
          if(p){
            for (let i = 0; i < p.data.length; i++){
              this.products.map((sku) => {
                if(sku.sku === p.data[i].attributes.sku_code){
                  this.products.filter(a => sku.sku === a.sku)[0].stock = p.data[i].attributes.quantity;
                }
              })
            }
          }
        });
        this.ecomm.getOptions(this.token.access_token).subscribe(o => {
          if(o){
            // console.log(o.data[0].attributes.price_amount_cents)
            for (let i = 0; i < o.data.length; i++){
              // RegEx opcji każdego SKU
              var re = new RegExp(o.data[i].attributes.sku_code_regex);
                // Mapuję po produktach i sprawdzam czy RegEx opcji pasuję do SKU code
                this.products.map((product) => {
                  if(product.sku && re.test(product.sku)){
                    // Jeśli pasuje to przygotowuję objekt dla znalezionych opcji
                    let option = {optionId: o.data[i].id, optionName: o.data[i].attributes.name}
                    // console.log(o.data[i].attributes.name);
                    // console.log(option);
                    // Sprawdzam czy produkt już miał tablicę z opcjami, tworzę ją i wpycham tam znalezione opcje
                    if(!product.options){
                      product.options = [];
                      this.products.filter(a => product.sku === a.sku)[0].options?.push(option);
                    }
                    else{
                      this.products.filter(a => product.sku === a.sku)[0].options?.push(option);
                    }
                  }
                })
            }
          }
        })
      }
      // console.log(this.products)
      //beds calculation
      for (let i = 0; i < this.products.length; i++) {
        this.beds += this.products[i].capacity || 0;
      }  
    });
  }
  //z komponentu product list
  onUpdatedCart(cart: any){
    this.ord = cart.ord;
    setOrderId(cart.ord);
    this.cart = cart.cart;
    setCart(cart.cart);
    setCheckoutButton(true.toString());
    this.openSnackBar('Added to cart', 'Open cart');
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
  }
  openDialog() {
      const dialogRef = this.dialog.open(CartComponent, {
        width: '500px',
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
}
