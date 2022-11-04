import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-shop-new',
  templateUrl: './shop-new.component.html',
  styleUrls: ['./shop-new.component.scss']
})
export class ShopNewComponent implements OnInit {

  token: any;

  constructor( private tok: TokenService) { }

  ngOnInit(): void {
    this.token = this.tok.getToken();
    console.log('TOKEN POBRANY' + this.tok)
  }

}
