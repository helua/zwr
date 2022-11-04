import { Component, Input, OnInit, Output } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { EcommerceService } from 'src/app/ecommerce.service';
import { getOrderId, setOrderId } from 'src/app/localStorage';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: any;
  @Input() token: any;
  @Input() stock: any;
  // @Output() updateCart = new EventEmitter<any>();
  @Input() ord: string = '';
  checkout: string = 'http://checkout.zwr.waw.pl/';
  cartIcon = faCartPlus;

  constructor(private ecomm: EcommerceService) { }

  ngOnInit() {
    if(getOrderId() !== undefined){
      this.ord = getOrderId();
    }
    console.log(this.stock);
  }

  createOrder(){
    if(!this.ord){
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(o => {
        this.ord = o.data.id;
        console.log(this.ord)
        setOrderId(this.ord);
        this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
          this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
            // this.updateCart.emit({cart: c, ord: this.ord});
          });
        });
      });
    }
    if(this.ord){
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
        this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
          // this.updateCart.emit({cart: c, ord: this.ord});
        });
      });

    }
  }
}
