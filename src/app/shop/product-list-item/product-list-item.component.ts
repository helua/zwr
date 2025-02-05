import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { emit } from 'process';
import { EcommerceService } from 'src/app/ecommerce.service';
import { getOrderId, getToken, setOrderId } from 'src/app/localStorage';
import { ShoppingService } from '../shopping.service';
import { token } from '../Product';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {


  @Input() product: any;
  @Input() ord: string = '';
  // token: any;
  cartIcon = faCartPlus;
  cart: any = {cart: {order: 's'}, order: 'sda'};
  @Output() updateCart = new EventEmitter<any>();
  // token: any = token;
  token: any = {
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3Mzg5NDM1MzQsInRlc3QiOmZhbHNlLCJyYW5kIjowLjQ0ODQ2NzE4NDY2NTY1MzUsImlhdCI6MTczODc3MDczNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.UZPHqR-zW4UYzBI8nteJzePTVV9wm7z75Ht2uEfKvxjpMNGpAtMilpHzQ2h7nHttPbgofBkyDkf1K-s1-ik0FLCTL2YDdkk2krwuxwvvSH3KWcQ1YYyuF6pTCGblMsRIH-m_hyH9w-9QlyEonLLY15xgCYFVn3CrL3j_EAZ7V2wTC3IEeKsWcxMuqhOUTMBGdExNF5RWhAoHSV4QonOiaqXYaeMIHuK1YaNhQLURqi9BJGzcrmhRF-oNLONXbH8lMM_iu-53JVF6x9KhPfRMnnKhBWbj4YVLSGIXT8jK504mbTKl9yI_KQNfwe-VPgswQRs7gqkYTVaEbGEtQtdY-iWvojDYFXwpYwwJ8Z3z-56UDhUz3Yyre_WO_GtBuoKyZIVpjuOOdFiF_TvjROWbVU8fnXxlozcr57aDvtAM1HHtZ4A_DyA4RtJiHGI0ibByBzJMp1HKYr2tPAzoP-sDfNVSjIYpi2jBH7o6i78NrQPjEKwHHkkz34WUN0Sg6GU6K9p3mEfoqZe-Monb_xiDhQ-bcTbvE_tWpiJ7FZYXQkkkgiaefJ6Ta6Kv_dnfhzqysbd6APP1KNSJg-RT3TJRHMOBZV09RgfAtZI_OAjtQXs1Rn3deToKPerAmwZRpKuTowD0rUFIQFculdFCOVvRENFKmCDvljOzr2hjG_lf38I",
    "token_type": "Bearer",
    "expires_in": 172800,
    "scope": "market:id:VgWXOhMQql",
    "created_at": 1738770734
}


  constructor(private ecomm: EcommerceService, private shop: ShoppingService) { }

  ngOnInit() {

    //Commerce Layer Token
    // this.token = JSON.parse(getToken());

  }
  createOrder(){
    if(!this.ord){
      console.log('nowe zamówienie')
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(o => {
        this.ord = o.data.id;
        setOrderId(this.ord);
        this.ecomm.addLineItems(this.token.access_token, o.data.id, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
          console.log(r)
          this.ecomm.getCart(this.token.access_token, o.data.id).subscribe(c => {
                    console.log(c)

            this.updateCart.emit({cart: c, ord: o.data.id});
          });
        });
      });
    }
    if(this.ord){
      console.log('istnieje zamówienie ')
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
        console.log(r)

        this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
          console.log(c)
          this.updateCart.emit({cart: c, ord: this.ord});
        });
      });

    }
  }
  //use of Shopping Service not working
  // createOrder3(token: any, ord: string, product: any){
  //   this.cart = this.shop.createOrder(token, ord, product)
  //   console.log(this.cart)
  //   this.emitOrder(this.cart);
  // }
  // emitOrder(cart: any){
  //   this.updateCart.emit(cart)
  // }


}
