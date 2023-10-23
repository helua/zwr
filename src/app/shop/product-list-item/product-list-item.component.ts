import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { emit } from 'process';
import { EcommerceService } from 'src/app/ecommerce.service';
import { getOrderId, getToken, setOrderId } from 'src/app/localStorage';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {


  @Input() product: any;
  @Input() ord: string = '';
  token: any;
  cartIcon = faCartPlus;
  cart: any = {cart: {order: 's'}, order: 'sda'};
  @Output() updateCart = new EventEmitter<any>();


  constructor(private ecomm: EcommerceService, private shop: ShoppingService) { }

  ngOnInit() {

    //Commerce Layer Token
    this.token = JSON.parse(getToken());

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
