import { Component, Input, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getCart, getCheckoutButton, getOrderId } from 'src/app/localStorage';


@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  constructor() { }

  cartIcon = faShoppingCart;
  @Input() badgeHidden: boolean = true;
  @Input() cart: any;

  ngOnInit(): void {
    this.cart = JSON.parse(getCart());
    var isTrueSet = (getCheckoutButton() === 'false');
    this.badgeHidden = isTrueSet;
  }
}
