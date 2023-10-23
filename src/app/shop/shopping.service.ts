import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EcommerceService } from '../ecommerce.service';
import { clear, getCart, getCheckoutButton, getOrderId, setCart, setCheckoutButton, setOrderId } from '../localStorage';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ord: string = '';
  cart: any;
  badgeHidden: boolean = false;
  @Output() updateCart = new EventEmitter<any>();


  constructor(private ecomm: EcommerceService, public dialog: MatDialog) { }

  createOrder(token: any, ord: string, product: any){
    console.log(token, ord, product)
    if(!ord){
      this.ecomm.createEmptyOrder(token.access_token).subscribe(o => {
        console.log(o.data.id);
        this.ord = o.data.id;
        setOrderId(o.data.id);
        this.ecomm.addLineItems(token.access_token, o.data.id, product.sku, product.title, product.images[0]).subscribe(r => {
          console.log(r);
          this.ecomm.getCart(token.access_token, o.data.id).subscribe(c => {
            console.log(c);
            this.cart = c;
            console.log({cart: c, ord: o.data.id});
          });
        });
      });
      return {cart: this.cart, ord: this.ord};
    }
    else{
      this.ecomm.addLineItems(token.access_token, ord, product.sku, product.title, product.images[0]).subscribe(r => {
        this.ecomm.getCart(token.access_token, ord).subscribe(c => {
          this.cart = c;
        });
      });
      return {cart: this.cart, ord: this.ord};
    }
  }

  clearLocalStorage(){
    clear();
    setOrderId('');
    setCart({
      data: {
        attributes: {
          skus_count: 0,
        }
      }
    });
    setCheckoutButton('false');
    console.log(getOrderId(), getCart())
  }
  getLocalStorage(){
    console.log(getCart())
  }
}
