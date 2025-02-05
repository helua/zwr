import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getCart, getOrderId, setOrderId, getCheckoutButton, setCheckoutButton, getToken, setCart } from 'src/app/localStorage';
import { FeedService } from 'src/app/feed.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../shop/Product';
import { TokenService } from 'src/app/token.service';
import { ShoppingService } from '../shopping.service';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // encapsulation: ViewEncapsulation.None,

})
export class ProductComponent implements OnInit {

  product: any;
  // token: any;
  ord: string = '';
  cart: any;
  // @Output() updateCart = new EventEmitter<any>();

  checkout: string = 'https://checkout.zwr.waw.pl/';
  cartIcon = faCartPlus;
  arrowIcon = faArrowLeft;
  title: string ='';
  productRaw: any = {};
  badgeHidden: boolean = true;
  // description: MetaDefinition = {};
  token: any = {
    "access_token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjliN2JiZmVlMzQzZDVkNDQ5ZGFkODhmMjg0MGEyZTM3YzhkZWFlZTg5NjM4MGQ1ODA2YTc4NWVkMWQ1OTc5ZjAifQ.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJBeUx2eEZHWmtuIiwic2x1ZyI6Inp3ci1ldmVudC1hZ2VuY3kiLCJlbnRlcnByaXNlIjpmYWxzZSwicmVnaW9uIjoiZXUtd2VzdC0xIn0sImFwcGxpY2F0aW9uIjp7ImlkIjoiQUdQa1ppcW12TiIsImNsaWVudF9pZCI6ImJfemV3Ui1SbWdhb05NcjNrSHctMW5KLTFudXNOLU1tQ3BGSFdVUGFadE0iLCJraW5kIjoic2FsZXNfY2hhbm5lbCIsInB1YmxpYyI6dHJ1ZX0sIm1hcmtldCI6eyJpZCI6WyJWZ1dYT2hNUXFsIl0sInN0b2NrX2xvY2F0aW9uX2lkcyI6WyJlbmJxUXVsZ1FNIl0sImdlb2NvZGVyX2lkIjpudWxsLCJhbGxvd3NfZXh0ZXJuYWxfcHJpY2VzIjpmYWxzZX0sInNjb3BlIjoibWFya2V0OmlkOlZnV1hPaE1RcWwiLCJleHAiOjE3Mzg3NzEzMTYsInRlc3QiOmZhbHNlLCJyYW5kIjowLjA3NTM2NjM5MDY3OTM4OTU1LCJpYXQiOjE3Mzg3NTY5MTYsImlzcyI6Imh0dHBzOi8vYXV0aC5jb21tZXJjZWxheWVyLmlvIn0.eFwhUIYT_JYPm62vgTGxRHT5o57QgkIIJVuCYQI4cWv3cbLSU--EQhXfpP2jBIViu1YZIP9JUPefWiW1Jzj-_IeLiuk_AUCvlLryisTokwsLrtwNEgW5rMvXbH_rdjIgiZ-xfUVHTPLP1iEQbjFiUACIofU-usCdOZaurg3I7jK20WIEUEAOenH5P37VPFWagSkwvxAWNeHj2mDY8WyjO5dVNZKA-vLYr6xFAHXaroFCnIRsZUDs5yq7gXJ-4LSjXSZxOqsp0t9iQjtkPnOt2IC-dw5_TxTiZVEz7bMYdK2Ar2jWIld-dmAPBP2U9GSCFxajGkG10YnYpjTjdPER8LXu98_TBaQr3wACTlyyyVdue5EUBvX7BEV1USLxZlXVsTTNIaRfzMdZTf7AePP45JfeOe9kFIBR3grM2ude6HbQUshQR0wjNNyfAOUXXzbEwIAc_t9sNxtAkRWGXTvwKTPufgVRsmZWyCdx5FVUWCIagadUiflWq6GHh5YGeUckgqD0XhByb1_j3PB-Lr9devtJkGDlZy6FmY5kw-HYSO-fylBfBTyrjG3KD9vnp2bTb1ntI4ALGKzzJk6ANhrBam5RQmyYJL36pkkjyJ4OrGswau53JDXImU4eAMT8lsLPMq-z4_f1-1LWjigzX46jHxS8xekh3k4NslklUeJKOpQ",
    "token_type": "Bearer",
    "expires_in": 8637,
    "scope": "market:id:VgWXOhMQql",
    "created_at": 1738756916
}

  constructor(
    private tok: TokenService,
    private ecomm: EcommerceService,
    private http: FeedService,
    private route: ActivatedRoute,
    private location: Location,
    private feed: FeedService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(){

    this.ord = getOrderId();
    console.log(this.ord);
    this.cart = JSON.parse(getCart());
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
    // this.token = JSON.parse(getToken());
    if(this.token == null){
      this.tok.getToken()
      // this.token = JSON.parse(getToken());
    }
    this.sanityAndCommerceLayer();
  }
  sanityAndCommerceLayer(){
    this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.http.getProduct(params.get('id')))).subscribe( product => {
        this.productRaw = product;
          if(product){
            console.log(this.productRaw.result[0]);
            this.product = this.feed.workResult(this.productRaw.result[0]);
            console.log(this.product)
          }
          this.ecomm.getPrices(this.token.access_token).subscribe(pr => {
            if(pr){
              for (let i = 0; i < pr.included.length; i++){
                if(this.product.sku === pr.included[i].attributes.sku_code){
                  this.product.price = pr.included[i].attributes.formatted_amount;
                  console.log(this.product.sku === pr.included[i].attributes.sku_code, this.product)
                }
              }
            }
          })
          this.ecomm.getStock(this.token.access_token).subscribe(pr => {
            if(pr){
              for (let i = 0; i < pr.data.length; i++){
                if(this.product.sku === pr.data[i].attributes.sku_code){
                  this.product.stock = pr.data[i].attributes.quantity;
                  console.log(this.product.sku === pr.data[i].attributes.sku_code, this.product)
                }
              }
            }
          })
        // this.title = this.product.title;
        // this.titleService.setTitle(this.title);
        // this.description = {name: 'description', content: this.post.meta};
        // this.metaService.updateTag(this.description);
      })
  }
  createOrder(){
    if(!this.ord){
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(o => {
        this.ord = o.data.id;
        console.log(this.ord)
        setOrderId(this.ord);
        console.log('nowe zamówienie')

        this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
          this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
            // this.updateCart.emit({cart: c, ord: this.ord});
            console.log({cart: c, ord: this.ord})
            this.cart = c;
            setCart(c);
            setCheckoutButton(true.toString());
            this.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
            var isTrueSet = (getCheckoutButton() === 'false');
            this.badgeHidden = isTrueSet;
          });
        });
      });
    }
    if(this.ord){
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
        console.log(r)
        this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
          console.log(c)
          console.log('intnieje zamówienie')
          // this.updateCart.emit({cart: c, ord: this.ord});
          this.cart = c;
          setCart(c);
          setCheckoutButton(true.toString());
          this.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
          var isTrueSet = (getCheckoutButton() === 'false');
          this.badgeHidden = isTrueSet;
        });
      });

    }
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
  goBack(){
    this.location.back();
  }
}

