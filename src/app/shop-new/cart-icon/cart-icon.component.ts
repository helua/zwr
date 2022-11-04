import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getCart, getCheckoutButton, getOrderId } from 'src/app/localStorage';
import { CartComponent } from 'src/app/shop/cart/cart.component';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  cartIcon = faShoppingCart;
  @Input() badgeHidden: boolean = false;//do testów widoczna czerwona piłka z numerkiem
  @Input() cart: any;
  ord: any;

  ngOnInit(): void {
    this.cart = JSON.parse(getCart());
    console.log(this.cart)
    // var isTrueSet = (getCheckoutButton() === 'false');
    // this.badgeHidden = isTrueSet;
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

}
