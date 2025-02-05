import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartData } from '../../shop/Product';
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
  token: any = {
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3Mzg3NzEzMTYsInRlc3QiOmZhbHNlLCJyYW5kIjowLjA3NTM2NjM5MDY3OTM4OTU1LCJpYXQiOjE3Mzg3NTY5MTYsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.eFwhUIYT_JYPm62vgTGxRHT5o57QgkIIJVuCYQI4cWv3cbLSU--EQhXfpP2jBIViu1YZIP9JUPefWiW1Jzj-_IeLiuk_AUCvlLryisTokwsLrtwNEgW5rMvXbH_rdjIgiZ-xfUVHTPLP1iEQbjFiUACIofU-usCdOZaurg3I7jK20WIEUEAOenH5P37VPFWagSkwvxAWNeHj2mDY8WyjO5dVNZKA-vLYr6xFAHXaroFCnIRsZUDs5yq7gXJ-4LSjXSZxOqsp0t9iQjtkPnOt2IC-dw5_TxTiZVEz7bMYdK2Ar2jWIld-dmAPBP2U9GSCFxajGkG10YnYpjTjdPER8LXu98_TBaQr3wACTlyyyVdue5EUBvX7BEV1USLxZlXVsTTNIaRfzMdZTf7AePP45JfeOe9kFIBR3grM2ude6HbQUshQR0wjNNyfAOUXXzbEwIAc_t9sNxtAkRWGXTvwKTPufgVRsmZWyCdx5FVUWCIagadUiflWq6GHh5YGeUckgqD0XhByb1_j3PB-Lr9devtJkGDlZy6FmY5kw-HYSO-fylBfBTyrjG3KD9vnp2bTb1ntI4ALGKzzJk6ANhrBam5RQmyYJL36pkkjyJ4OrGswau53JDXImU4eAMT8lsLPMq-z4_f1-1LWjigzX46jHxS8xekh3k4NslklUeJKOpQ",
    "token_type": "Bearer",
    "expires_in": 8637,
    "scope": "market:id:VgWXOhMQql",
    "created_at": 1738756916
}

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
