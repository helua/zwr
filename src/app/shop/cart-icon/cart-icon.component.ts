import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getCart, getCheckoutButton, getOrderId } from 'src/app/localStorage';
import { CartComponent } from 'src/app/shop/cart/cart.component';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  constructor(private shop: ShoppingService) { }

  cartIcon = faShoppingCart;
  @Input() badgeHidden: boolean = true;
  @Input() cart: any;

  ngOnInit(): void {
    this.cart = JSON.parse(getCart());
    console.log(this.cart)
    //po powrocie na stronę pokaż badge jeśli coś jest w koszyku
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
  }

  openDialog() {
    this.shop.openDialog()
    //przeniesione do SHOPPING SERVICE
    // const dialogRef = this.dialog.open(CartComponent, {
    //   width: '466px',
    //   maxWidth: '97vw',
    //   data: { ord: this.ord },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log(`Dialog result: ${result}`);
    //   this.cart = JSON.parse(getCart());
    //   this.ord = getOrderId();
    //   // console.log(this.ord);
    // });
  }

}
