import { Component, Input, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { FeedService } from 'src/app/feed.service';
import { getCart, getOrderId, getToken, setCart, setCheckoutButton, setOrderId } from 'src/app/localStorage';
import { Product } from 'src/app/shop-new/Product';

@Component({
  selector: 'app-shopping-new',
  templateUrl: './shopping-new.component.html',
  styleUrls: ['./shopping-new.component.scss']
})
export class ShoppingNewComponent implements OnInit {

  productsRaw: any;
  products: Product[] = [];

  token: any;
  prices: any = [];

  ord: string = '';
  cart: any;
  badgeHidden: boolean = false;

  constructor(private feed: FeedService, private ecomm: EcommerceService,) { }

  ngOnInit(): void {
    this.ord = getOrderId();

    //Commerce Layer Token
    this.token = JSON.parse(getToken());

    //Sanity
    this.feed.getProducts().subscribe( products => {
      this.productsRaw = products;
      for (let i = 0; i < this.productsRaw.result.length; i++){
        this.products.push(this.feed.workResult(this.productsRaw.result[i]));
      }
      //Commerce Layer data & synchro
      if(this.token){
        this.ecomm.getPrices(this.token.access_token).subscribe(p => {
          if(p){
            for (let i = 0; i < p.included.length; i++){
              this.products.map((sku) => {
                if(sku.sku === p.included[i].attributes.sku_code){
                  //GOOD CENA SYNCHRO
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
                //GOOD STOCK SYNCHRO
                if(sku.sku === p.data[i].attributes.sku_code){
                  this.products.filter(a => sku.sku === a.sku)[0].stock = p.data[i].attributes.quantity;
                }
              })
            }
          }
        });
      }
      console.log('ZOBACZ JAK MAM OGARNIETE WSZYSTKEI PRODUKTY');
      console.log(this.products);
    });
  }
  onUpdatedCart(cart: any){
    this.ord = cart.ord;
    setOrderId(cart.ord);
    this.cart = cart.cart;
    setCart(cart.cart);
    setCheckoutButton(true.toString());
    // this.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
    // var isTrueSet = (getCheckoutButton() === 'false');
    // this.badgeHidden = isTrueSet;


  }
}
