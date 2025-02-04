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
  token: any;
  prices: any = [];
  ord: string = '';
  cart: any;
  badgeHidden: boolean = true;
  checkout: string = 'https://checkout.zwr.waw.pl/';

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
    this.token = JSON.parse(getToken());
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
