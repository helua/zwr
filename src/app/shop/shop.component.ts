import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';
import { TokenService } from '../token.service';
import { ShoppingService } from './shopping.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  token: any;

  constructor( private tok: TokenService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.tok.getToken();
    console.log('Current Route:', this.route.snapshot.url.join('/'));
    // console.log('TOKEN POBRANY')
    // console.log(this.token)
  }


}
