import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { getCart, getOrderId, setOrderId, getCheckoutButton, setCheckoutButton } from 'src/app/localStorage';
import { FeedService } from 'src/app/feed.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../Product';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // encapsulation: ViewEncapsulation.None,

})
export class ProductComponent implements OnInit {

  @Input() product?: any;
  @Input() token: any;
  @Input() stock: any;
  @Input() ord: string = '';

  @Output() updateCart = new EventEmitter<any>();
  checkout: string = 'http://checkout.zwr.waw.pl/';
  cartIcon = faCartPlus;
  title: string ='';
  productRaw: any = {};
  productID: string = '';
  description: MetaDefinition = {};

  constructor(
    private ecomm: EcommerceService,
    private http: FeedService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(){
    if(getOrderId() !== undefined){
      this.ord = getOrderId();
    }
    // console.log(this.stock);
    // console.log(getCheckoutButton())
    // console.log('pobieram daną o Checkout Button z localStorage');
    //   var isTrueSet = (getCheckoutButton() === 'true');
    //   this.isCheckoutEnabled = isTrueSet;
    //   console.log(this.isCheckoutEnabled);
    console.log('PRODUCT')
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.http.getProduct(
          params.get('id'))
        )
      ).subscribe( product => {
        this.productRaw = product;
        console.log(product)
        this.product = this.http.workResult(this.productRaw.result[0]);
        this.productID = this.product.sku;
        console.log(this.productID)

        this.title = this.product.title;
        // this.titleService.setTitle(this.title);
        // this.description = {name: 'description', content: this.post.meta};
        // this.metaService.updateTag(this.description);
      })
  }

  createOrder(){
    if(!this.ord){
      this.ecomm.createEmptyOrder(this.token.access_token).subscribe(o => {
        this.ord = o.data.id;
        setOrderId(this.ord);
        this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
          this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
            this.updateCart.emit({cart: c, ord: this.ord});
            // this.isCheckoutEnabled = true;
            // setCheckoutButton(this.isCheckoutEnabled.toString());
          });
        });
      });
    }
    if(this.ord){
      this.ecomm.addLineItems(this.token.access_token, this.ord, this.product.sku, this.product.title, this.product.images[0]).subscribe(r => {
        this.ecomm.getCart(this.token.access_token, this.ord).subscribe(c => {
          this.updateCart.emit({cart: c, ord: this.ord});
        });
      });

    }
  }
}

