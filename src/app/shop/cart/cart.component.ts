import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartData, token } from '../../shop/Product';
import { faTimes, faSync, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/ecommerce.service';
import { getCart, getCheckoutButton, getShipment, getToken, setCart, setCheckoutButton, setOrderId, setShipment } from 'src/app/localStorage';
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
  // token: any;
  lineItems: any = [];
  shipment: any;
  checkout: string = 'https://checkout.zwr.waw.pl/';
  isRefreshEnabled: boolean = true;
  isCheckoutEnabled: boolean = true;
  isCheckoutUnfinished: boolean = false;
  isPaymentCaptured: boolean = false;
  token: any = token;

  constructor(
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartData,
    public router: Router,
    private ecomm: EcommerceService,
    private shop: ShoppingService) {}

  ngOnInit(): void {
    // this.token = JSON.parse(getToken());
    this.ord =  this.data.ord;
    this.cart = JSON.parse(getCart());
    this.shipment = JSON.parse(getShipment());
    var isTrueSet = (getCheckoutButton() === 'true');
    this.isCheckoutEnabled = isTrueSet;
    if(this.cart.data.attributes.skus_count != 0){
      console.log('LINE ITEMY');
      console.log(this.cart.included);
      for(let i = 0; i < this.cart.included.length; i++){
        this.ecomm.getLineItemsOptions(this.token.access_token, this.cart.included[i].id).subscribe(o => {
          console.log('OPCJE JEDNEGO Z ITEMÓW');
          console.log(o);
          this.lineItems.push({id: this.cart.included[i].id, sku: this.cart.included[i].attributes.sku_code, name: this.cart.included[i].attributes.name, img: this.cart.included[i].attributes.image_url})
          console.log('FRONTOWE ITEM OPRACOWANY');
          console.log(this.lineItems);
            // jeśli ma sku_options
            // if(o.included){
            //   console.log('OPCJE Z CL');
            //   console.log(o.included);
            //   console.log('ZNALEZIONY PRODUKT POWINIEN POSIADAĆ OPCJE');
            //   let item = this.lineItems.find((a: { id: string; }) => a.id === this.cart.included[i].id)
            //   console.log(item);
            //   let options: any = [];
            //   for(let i = 0; i < o.included.length; i++){
            //     console.log('PĘTLA DLA KAŻDEJ OPCJI LINE ITEMS')
            //     console.log(o.included[i].attributes.name)
            //     options.push(o.included[i].attributes.name);
            //   }
            //   console.log('TABELKA Z OPCJAMI DLA PRODUKTU');
            //   console.log(options);
            //   item.options = options;
            //   console.log('PIERWSZY FRONT ITEMY PO DODANIU OPCJI');
            //   console.log(this.lineItems[0].options);
            // }
          });
        }
      }
  }

  onClose(): void {
    this.dialogRef.close()
  }

  //usuń item z koszyka, i cały pusty koszyk
  trashItem(id: string){
    this.ecomm.deleteLineItem(this.token.access_token, id).subscribe(result => {
      this.ecomm.getCart(this.token.access_token, this.data.ord).subscribe(o =>{
        setCart(o);
        this.cart = JSON.parse(getCart());
        this.lineItems.splice(this.lineItems.findIndex((e: { id: string; }) => e.id === id),1);
        if(this.lineItems.length < 1){
          setOrderId('');
          this.ord = '';
          setCart({
            data: {
              attributes: {
                skus_count: 0,
              }
            }
          });
          setCheckoutButton('false');
        }
      });
    });
  }

  //Odśwież status zamówienia
  getCurrentOrder(){
    this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
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

  //Usuń potwierdzenie i zamów jeszcze raz
  clearLocalStorage(){
    this.shop.clearLocalStorage;
  }

}
