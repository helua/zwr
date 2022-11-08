import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { getToken } from '../localStorage';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  title = 'ZWR | Wypożyczalnia';
  description: MetaDefinition = {name: 'description', content: 'Najlepszy sprzęt turniejowy do wypożyczenia tu i teraz.'};
  token: any;

  constructor( private titleService: Title, private metaService: Meta, private tok: TokenService) { }

  ngOnInit() {

    this.token = this.tok.getToken();
    // console.log('Token pobrany = sklep otwarty')
    // console.log(this.token);



    //SEO
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);

    //STYLES MENU
    let logo = document.getElementById("tablet") as HTMLElement;
    logo.style.position = 'absolute';
    let navMain = Array.from(document.getElementsByClassName("nav-main") as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < navMain.length; i++) {
      navMain[i].style.position = 'absolute';
    }
  }

  ngOnDestroy(){
    let logo = document.getElementById("tablet") as HTMLElement;
    logo.style.position = 'fixed';
    let navMain = Array.from(document.getElementsByClassName("nav-main") as HTMLCollectionOf<HTMLElement>);
    for (let i = 0; i < navMain.length; i++) {
      navMain[i].style.position = 'fixed';
    }
  }
}

