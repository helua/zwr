import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';
import { TokenService } from '../token.service';
import { ShoppingService } from './shopping.service';
import { ActivatedRoute, Route } from '@angular/router';
import { token } from './Product';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  // token: any;
  token: any = token;
  title = 'EBUCC 2025';
  description: MetaDefinition = { name: 'description', content: 'We organised 2025 European Ultimate Club Championships in Gdańsk, Poland' };  

  constructor( private tok: TokenService, public route: ActivatedRoute, private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    // this.token = this.tok.getToken();
    // console.log('TOKEN POBRANY')
    // console.log(this.token)
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
    this.metaService.addTags([
      {property: 'og:image', content: 'https://zwr.waw.pl/assets/ebucc-cover.jpg'}
    ]);
  }


}
