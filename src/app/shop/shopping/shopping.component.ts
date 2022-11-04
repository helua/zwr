import { Component, Input, OnInit, ɵɵi18nAttributes } from '@angular/core';
import { FeedService } from 'src/app/feed.service';
import { Product } from '../Product'
import { EcommerceService } from 'src/app/ecommerce.service';
import { MatDialog } from '@angular/material/dialog';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartComponent } from '../cart/cart.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getCart, getCheckoutButton, getOrderId, getToken, setCart, setCheckoutButton, setOrderId } from 'src/app/localStorage';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  cartIcon = faShoppingCart;
  badgeHidden: boolean = true;

  productsRaw: any = [];
  products: Product[] = [
    // {title: "",
    // slug: "",
    // categories: "",
    // vendor: "",
    // body: "",
    // // images: [{}],
    // sku: "",
    // weight: "",
    // length: "",
    // bladeLength: "",
    // bladeWidth: "",
    // steelThickness: ""}
  ];

  price: any ='';
  prices: any = [];
  cart: any = '';
  ord: string = '';
// cart = {
//   data: {
//     attributes: {
//       formatted_discount_amount: "0,00 zł",
//       formatted_gift_card_amount: "0,00 zł",
//       formatted_shipping_amount: "0,00 zł"   ​​​,
//       formatted_subtotal_amount: "1 000,00 zł"  , ​​​
//       formatted_total_amount_with_taxes: "1 000,00 zł" ,  ​​​
//       formatted_total_tax_amount: "0,00 zł"  ​​​,
//       number: 14963121  ,​​​
//       skus_count: 1,
//       image_url: "https://cdn.sanity.io/images/reekcfrj/production/1465e9a3aabe4b5240c64a2961a3b9d02623a1a8-3217x4021.jpg",
//       name: "Nóż typu finka Tipi Knapa"
//     }
//   }
// };
  @Input() token: any;
  constructor(private feed: FeedService, private ecomm: EcommerceService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cart = JSON.parse(getCart());
    this.ord = getOrderId();
        // console.log(getOrderId());
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
    // console.log(getCheckoutButton());

    //Commerce Layer Token
    this.token = JSON.parse(getToken());

    //Sanity
    this.feed.getProducts().subscribe( products => {
      this.productsRaw = products;
      // GOOD PRODUKTY
      for (let i = 0; i < this.productsRaw.result.length; i++){
        this.products.push(this.feed.workResult(this.productsRaw.result[i]));
      }
      if(this.token){
        this.ecomm.getPrices(this.token.access_token).subscribe(p => {
          if(p){
            console.log(p.included)
            //GOOD CENA SYNCHRO
            for (let i = 0; i < p.included.length; i++){
              this.products.map((sku) => {
                if(sku.sku === p.included[i].attributes.sku_code){
                  this.products.filter(a => sku.sku === a.sku)[0].price = p.included[i].attributes.formatted_amount;
                }
              })
            }

            this.price = p.included[1].attributes.formatted_amount;//nie będzie tego
          }
        });
        this.ecomm.getStock(this.token.access_token).subscribe(p => {
          if(p){
            //do poprawienia przy >1 produkcie
            // this.stock = p.data[1].attributes.quantity;

            //GOOD STOCK SYNCHRO
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
      console.log(this.products);
    });
  }


///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
//koszyk
  onUpdatedCart(cart: any){
    this.ord = cart.ord;
    setOrderId(cart.ord);
    // console.log(getOrderId());
    this.cart = cart.cart;
    setCart(cart.cart);
    // console.log('dodano do koszyka');
    // console.log(getCart());
    setCheckoutButton(true.toString());
    this.openSnackBar('Dodano do koszyka', 'Zobacz koszyk');
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
  }

  toggleBadgeVisibility() {
    if(this.badgeHidden = true){
      this.badgeHidden = !this.badgeHidden;
    }
  }

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
