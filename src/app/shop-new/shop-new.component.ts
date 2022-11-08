import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-shop-new',
  templateUrl: './shop-new.component.html',
  styleUrls: ['./shop-new.component.scss']
})
export class ShopNewComponent implements OnInit {

  token: any;

  constructor( private tok: TokenService, private ecomm: EcommerceService) { }

  ngOnInit(): void {
    this.token = this.tok.getToken();
    // console.log('TOKEN POBRANY')
    // console.log(this.token)
    // this.ecomm.getPrices(this.token).subscribe(
    //   p => {
    //     console.log(p)
    //   }
    // )
  }

}
