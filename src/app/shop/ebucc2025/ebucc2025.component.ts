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
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3Mzg3NzEzMTYsInRlc3QiOmZhbHNlLCJyYW5kIjowLjA3NTM2NjM5MDY3OTM4OTU1LCJpYXQiOjE3Mzg3NTY5MTYsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.eFwhUIYT_JYPm62vgTGxRHT5o57QgkIIJVuCYQI4cWv3cbLSU--EQhXfpP2jBIViu1YZIP9JUPefWiW1Jzj-_IeLiuk_AUCvlLryisTokwsLrtwNEgW5rMvXbH_rdjIgiZ-xfUVHTPLP1iEQbjFiUACIofU-usCdOZaurg3I7jK20WIEUEAOenH5P37VPFWagSkwvxAWNeHj2mDY8WyjO5dVNZKA-vLYr6xFAHXaroFCnIRsZUDs5yq7gXJ-4LSjXSZxOqsp0t9iQjtkPnOt2IC-dw5_TxTiZVEz7bMYdK2Ar2jWIld-dmAPBP2U9GSCFxajGkG10YnYpjTjdPER8LXu98_TBaQr3wACTlyyyVdue5EUBvX7BEV1USLxZlXVsTTNIaRfzMdZTf7AePP45JfeOe9kFIBR3grM2ude6HbQUshQR0wjNNyfAOUXXzbEwIAc_t9sNxtAkRWGXTvwKTPufgVRsmZWyCdx5FVUWCIagadUiflWq6GHh5YGeUckgqD0XhByb1_j3PB-Lr9devtJkGDlZy6FmY5kw-HYSO-fylBfBTyrjG3KD9vnp2bTb1ntI4ALGKzzJk6ANhrBam5RQmyYJL36pkkjyJ4OrGswau53JDXImU4eAMT8lsLPMq-z4_f1-1LWjigzX46jHxS8xekh3k4NslklUeJKOpQ",
    "token_type": "Bearer",
    "expires_in": 8637,
    "scope": "market:id:VgWXOhMQql",
    "created_at": 1738756916
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
