import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { emit } from 'process';
import { EcommerceService } from 'src/app/ecommerce.service';
import { getOrderId, getToken, setCart, setOrderId } from 'src/app/localStorage';
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
  token: any = token;
  link: string = '/sklep'
  selectedOption: any;


  constructor(private ecomm: EcommerceService) { }

  ngOnInit() {
    // console.log(this.product)
    //Commerce Layer Token
    // this.token = JSON.parse(getToken());

  }
  createPricePerNight(input: string): number {
    return Math.floor(parseFloat(input.slice(0, -6).replace(' ', '').replace(',', '.')) / 3 * 10 ) / 10 ;
  }
  
  createOrder(){
    if(!this.ord){
      console.log('nowe zamówienie')
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(or => {
        this.ord = or.data.id;
        setOrderId(this.ord);
        this.ecomm.addLineItems(this.token.access_token, or.data.id, this.product.sku, this.product.title, this.product.images[0]).subscribe(
          {      
            next: (l) => {
              if(this.selectedOption){
                this.ecomm.addLineItemOptions(this.token.access_token, l.data.id, this.selectedOption.optionId, this.selectedOption.optionName).subscribe(op => {
                  this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                    setCart(c);
                    this.updateCart.emit({cart: c, ord: this.ord});
                  });
                })
              }
              else{
                this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                  setCart(c);
                  this.updateCart.emit({cart: c, ord: this.ord});
                });
              }
            },
            error: (err) => {
              alert(err.error.errors[0].title);
            }
          }
        );
      });
    }
    if(this.ord){
      console.log('istnieje zamówienie ' + this.ord)
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(
        {
          next: (l) => {
            if(this.selectedOption){
              this.ecomm.addLineItemOptions(this.token.access_token, l.data.id, this.selectedOption.optionId, this.selectedOption.optionName).subscribe(op => {
                this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                  setCart(c);
                  this.updateCart.emit({cart: c, ord: this.ord});
                });
              })
            }
            else{
              this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
                setCart(c);
                this.updateCart.emit({cart: c, ord: this.ord});
              });
            }
          },
          error: (err) => {
            alert(err.error.errors[0].title);
          }
        }
      )
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
