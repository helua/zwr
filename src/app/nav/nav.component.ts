import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shop/shopping.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private shop: ShoppingService){}
  ngOnInit(): void {
  }
  clearLocalStorage(){
    this.shop.clearLocalStorage();
  }
  getLocalStorage(){
    this.shop.getLocalStorage();
  }
}
