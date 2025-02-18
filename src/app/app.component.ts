import { Component } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { getToken, clear, setCart, setOrderId, setCheckoutButton, getCart, getOrderId, getCheckoutButton, getIndex, setIndex } from '../app/localStorage'
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zwr';
  // norobots: MetaDefinition = {robots: 'description', content: 'noindex, nofollow, noimageindex'};

  constructor(){};

  ngOnInit(){
    // clear();
    // this.metaService.updateTag(this.norobots);
    if(getCart() === null){
      setCart({
      data: {
        attributes: {
          skus_count: 0,
        }
      }
    });
    }
    if(getOrderId() === null){
      setOrderId('');
    }
    if(getCheckoutButton() === null){
      setCheckoutButton('false');
    }
    if(getIndex() === null){
      setIndex('0');
    }
  }
}
