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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3Mzg5NDM1MzQsInRlc3QiOmZhbHNlLCJyYW5kIjowLjQ0ODQ2NzE4NDY2NTY1MzUsImlhdCI6MTczODc3MDczNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.UZPHqR-zW4UYzBI8nteJzePTVV9wm7z75Ht2uEfKvxjpMNGpAtMilpHzQ2h7nHttPbgofBkyDkf1K-s1-ik0FLCTL2YDdkk2krwuxwvvSH3KWcQ1YYyuF6pTCGblMsRIH-m_hyH9w-9QlyEonLLY15xgCYFVn3CrL3j_EAZ7V2wTC3IEeKsWcxMuqhOUTMBGdExNF5RWhAoHSV4QonOiaqXYaeMIHuK1YaNhQLURqi9BJGzcrmhRF-oNLONXbH8lMM_iu-53JVF6x9KhPfRMnnKhBWbj4YVLSGIXT8jK504mbTKl9yI_KQNfwe-VPgswQRs7gqkYTVaEbGEtQtdY-iWvojDYFXwpYwwJ8Z3z-56UDhUz3Yyre_WO_GtBuoKyZIVpjuOOdFiF_TvjROWbVU8fnXxlozcr57aDvtAM1HHtZ4A_DyA4RtJiHGI0ibByBzJMp1HKYr2tPAzoP-sDfNVSjIYpi2jBH7o6i78NrQPjEKwHHkkz34WUN0Sg6GU6K9p3mEfoqZe-Monb_xiDhQ-bcTbvE_tWpiJ7FZYXQkkkgiaefJ6Ta6Kv_dnfhzqysbd6APP1KNSJg-RT3TJRHMOBZV09RgfAtZI_OAjtQXs1Rn3deToKPerAmwZRpKuTowD0rUFIQFculdFCOVvRENFKmCDvljOzr2hjG_lf38I",
    "token_type": "Bearer",
    "expires_in": 172800,
    "scope": "market:id:VgWXOhMQql",
    "created_at": 1738770734
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
