import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartData } from '../../shop/Product';
import { faTimes, faSync, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/ecommerce.service';
import { clear, getCart, getCheckoutButton, getOrderId, getShipment, getToken, setCart, setCheckoutButton, setOrderId, setShipment } from 'src/app/localStorage';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  closeIcon = faTimes;
  trashIcon = faTrashAlt;
  cartIcon = faShoppingCart;
  syncIcon = faSync;
  cart: any;
  ord: any;
  token: any;
  line_items: any;
  shipment: any;
  checkout: string = 'http://checkout.zwr.waw.pl/';
  isRefreshEnabled: boolean = true;
  isCheckoutEnabled: boolean = true;
  isCheckoutUnfinished: boolean = false;
  isPaymentCaptured: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartData,
    public router: Router,
    private ecomm: EcommerceService,
    private shop: ShoppingService) {}

  ngOnInit(): void {
    this.token = JSON.parse(getToken());

    // this.ord = this.data.ord;
    // console.log(this.data);
    this.ord =  getOrderId();

    // console.log(this.ord);
    // console.log('pobieram koszyk z localStorage');
    this.cart = JSON.parse(getCart());
    console.log(this.cart);
    // console.log('pobieram dane o wysyłce z localStorage');
    this.shipment = JSON.parse(getShipment());
    // console.log(this.shipment);
    // console.log('pobieram daną o Checkout Button z localStorage');
      var isTrueSet = (getCheckoutButton() === 'true');
      this.isCheckoutEnabled = isTrueSet;
      // console.log(this.isCheckoutEnabled);

    if(this.cart.data.attributes.skus_count != 0){
      this.line_items = this.cart.included.find((e: { attributes: { item_type: string; }; }) => e.attributes.item_type === 'skus');
      // this.line_items = this.cart.included;
      let i;
      for(i = 0; i > this.line_items.length; i++ ){
        // this.line
      }
      // console.log(this.line_items);
      // console.log(this.cart.included);

    }
    // console.log(this.cart.data.attributes);

  }

  onClose(): void {
    this.dialogRef.close()
  }
  trashItem(id: string){
    // console.log('usuwam line item');
    console.log(id);
    this.ecomm.deleteLineItem(this.token.access_token, id).toPromise().then(result => {
      console.log(result)
      this.ecomm.getCart(this.token.access_token, this.ord).subscribe(o =>{
        // console.log('koszyk po usunięciu');
        // console.log(o);
        setCart(o);
        this.cart = JSON.parse(getCart());
        setCheckoutButton('false');
      });
    });
    // this.onClose();
    // this.shop.openSnackBar('Koszyk jest pusty', 'Fajnie!');
  }

  getCurrentOrder(){
    this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
      // console.log('pobieram koszyk z CL');
      // console.log(c);
      setCart(c);
      this.cart = c;
      if(c.included.length === 3){
        this.isCheckoutEnabled = false;
        setCheckoutButton(this.isCheckoutEnabled.toString());
        this.shipment = this.cart.included.find((e: { attributes: { item_type: string; }; }) => e.attributes.item_type === 'shipments');
        setShipment(this.shipment);
        this.isCheckoutUnfinished = false;
        setOrderId('');//wtfuck
      }
      else{
        this.isCheckoutUnfinished = true;
      }
    });
  }
  clearLocalStorage(){
    this.shop.clearLocalStorage;
  }

}
