import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { getCart, getOrderId, setOrderId, getCheckoutButton, setCheckoutButton, getToken, setCart } from 'src/app/localStorage';
import { FeedService } from 'src/app/feed.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../shop/Product';
import { TokenService } from 'src/app/token.service';
import { ShoppingService } from '../shopping.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // encapsulation: ViewEncapsulation.None,

})
export class ProductComponent implements OnInit {

  product: any;
  token: any;
  ord: string = '';
  cart: any;

  @Output() updateCart = new EventEmitter<any>();

  checkout: string = 'http://checkout.zwr.waw.pl/';
  cartIcon = faCartPlus;
  title: string ='';
  productRaw: any = {};
  badgeHidden: boolean = true;

  // description: MetaDefinition = {};

  constructor(
    private ecomm: EcommerceService,
    private http: FeedService,
    private route: ActivatedRoute,
    private feed: FeedService,
    private tok: TokenService,
    private shop: ShoppingService
    // private titleService: Title,
    // private metaService: Meta,
  ) {}

  ngOnInit(){
    if(getOrderId() !== undefined){
      this.ord = getOrderId();
    }
    console.log(this.ord);

    if(!JSON.parse(getToken())){
      this.tok.getToken();
      this.token = JSON.parse(getToken())
    }
    else{
      this.token = JSON.parse(getToken())
    };


    console.log(getCheckoutButton())
    // console.log('pobieram daną o Checkout Button z localStorage');
      var isTrueSet = (getCheckoutButton() === 'true');
      this.badgeHidden = !isTrueSet;
      console.log(this.badgeHidden);

    this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.http.getProduct(params.get('id')))).subscribe( product => {
        this.productRaw = product;
          if(product){
            console.log(this.productRaw.result[0]);
            this.product = this.feed.workResult(this.productRaw.result[0]);
            console.log(this.product)
          }
          this.ecomm.getPrices(this.token.access_token).subscribe(pr => {
            if(pr){
              for (let i = 0; i < pr.included.length; i++){
                if(this.product.sku === pr.included[i].attributes.sku_code){
                  this.product.price = pr.included[i].attributes.formatted_amount;
                  console.log(this.product.sku === pr.included[i].attributes.sku_code, this.product)
                }
              }
            }
          })
          this.ecomm.getStock(this.token.access_token).subscribe(pr => {
            if(pr){
              for (let i = 0; i < pr.data.length; i++){
                if(this.product.sku === pr.data[i].attributes.sku_code){
                  this.product.stock = pr.data[i].attributes.quantity;
                  console.log(this.product.sku === pr.data[i].attributes.sku_code, this.product)
                }
              }
            }
          })

        // this.title = this.product.title;
        // this.titleService.setTitle(this.title);
        // this.description = {name: 'description', content: this.post.meta};
        // this.metaService.updateTag(this.description);
      })
  }
  createOrder(){
    if(!this.ord){
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(o => {
        this.ord = o.data.id;
        console.log(this.ord)
        setOrderId(this.ord);
        this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
          this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
            // this.updateCart.emit({cart: c, ord: this.ord});
            // console.log({cart: c, ord: this.ord})
            this.cart = c;
            setCart(c);
            setCheckoutButton(true.toString());
            this.shop.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
            var isTrueSet = (getCheckoutButton() === 'false');
            this.badgeHidden = isTrueSet;

          });
        });
      });
    }
    if(this.ord){
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
        this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
          // this.updateCart.emit({cart: c, ord: this.ord});
          this.cart = c;
          setCart(c);
          setCheckoutButton(true.toString());
          this.shop.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
          var isTrueSet = (getCheckoutButton() === 'false');
          this.badgeHidden = isTrueSet;
        });
      });

    }
  }


}

