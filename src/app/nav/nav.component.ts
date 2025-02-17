import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shop/shopping.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private shop: ShoppingService, public route: ActivatedRoute){}
  ngOnInit(): void {
  }
  clearLocalStorage(){
    this.shop.clearLocalStorage();
  }
  getLocalStorage(){
    this.shop.getLocalStorage();
  }
}
