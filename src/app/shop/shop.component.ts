import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';
import { TokenService } from '../token.service';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  token: any;

  constructor( private tok: TokenService) { }

  ngOnInit(): void {
    this.token = this.tok.getToken();
    // console.log('TOKEN POBRANY')
    // console.log(this.token)
  }


}
