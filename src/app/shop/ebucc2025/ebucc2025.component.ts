import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { FeedService } from 'src/app/feed.service';
import { getCart, getCheckoutButton, getOrderId, getToken, setCart, setCheckoutButton, setOrderId } from 'src/app/localStorage';
import { Product } from 'src/app/shop/Product';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  token: any = {
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3Mzg5NDM1MzQsInRlc3QiOmZhbHNlLCJyYW5kIjowLjQ0ODQ2NzE4NDY2NTY1MzUsImlhdCI6MTczODc3MDczNCwiaXNzIjoiaHR0cHM6Ly9hdXRoLmNvbW1lcmNlbGF5ZXIuaW8ifQ.UZPHqR-zW4UYzBI8nteJzePTVV9wm7z75Ht2uEfKvxjpMNGpAtMilpHzQ2h7nHttPbgofBkyDkf1K-s1-ik0FLCTL2YDdkk2krwuxwvvSH3KWcQ1YYyuF6pTCGblMsRIH-m_hyH9w-9QlyEonLLY15xgCYFVn3CrL3j_EAZ7V2wTC3IEeKsWcxMuqhOUTMBGdExNF5RWhAoHSV4QonOiaqXYaeMIHuK1YaNhQLURqi9BJGzcrmhRF-oNLONXbH8lMM_iu-53JVF6x9KhPfRMnnKhBWbj4YVLSGIXT8jK504mbTKl9yI_KQNfwe-VPgswQRs7gqkYTVaEbGEtQtdY-iWvojDYFXwpYwwJ8Z3z-56UDhUz3Yyre_WO_GtBuoKyZIVpjuOOdFiF_TvjROWbVU8fnXxlozcr57aDvtAM1HHtZ4A_DyA4RtJiHGI0ibByBzJMp1HKYr2tPAzoP-sDfNVSjIYpi2jBH7o6i78NrQPjEKwHHkkz34WUN0Sg6GU6K9p3mEfoqZe-Monb_xiDhQ-bcTbvE_tWpiJ7FZYXQkkkgiaefJ6Ta6Kv_dnfhzqysbd6APP1KNSJg-RT3TJRHMOBZV09RgfAtZI_OAjtQXs1Rn3deToKPerAmwZRpKuTowD0rUFIQFculdFCOVvRENFKmCDvljOzr2hjG_lf38I",
    "token_type": "Bearer",
    "expires_in": 172800,
    "scope": "market:id:VgWXOhMQql",
    "created_at": 1738770734
}

  constructor(
    private feed: FeedService,
    private ecomm: EcommerceService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ord = getOrderId();
    this.cart = JSON.parse(getCart());
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
    //Commerce Layer Token
    // this.token = JSON.parse(getToken());
    this.sanityAndCommerceLayer();
  }
  sanityAndCommerceLayer(){
   //Sanity
   this.feed.getAcco().subscribe( products => {
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
    this.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
  }
  openDialog() {
      const dialogRef = this.dialog.open(CartComponent, {
        width: '466px',
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
