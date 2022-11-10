import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EcommerceService } from '../ecommerce.service';
import { clear, getCart, getOrderId, setCart, setCheckoutButton, setOrderId } from '../localStorage';
import { CartComponent } from './cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ord: string = '';
  cart: any;
  @Output() updateCart = new EventEmitter<any>();


  constructor(private ecomm: EcommerceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

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
  openSnackBar(message: string, action: string) {
    let ref = this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
    ref.onAction().subscribe(() => {
      this.openDialog();
    });
  }
  // enableRefreshOrder(){
  //   if(this.isRefreshEnabled === false){
  //     this.isRefreshEnabled = true;
  //   }
  // }

  openDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '466px',
      maxWidth: '97vw',
      data: { ord: this.ord },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.cart = JSON.parse(getCart());
      this.ord = getOrderId();
      // console.log(this.ord);
    });
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
    console.log(getOrderId(), getCart())
  }
}
