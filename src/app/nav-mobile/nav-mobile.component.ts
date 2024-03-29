import { Component, OnInit } from '@angular/core';
import { faFacebookF, faInstagram, faVimeoV } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { getCheckoutButton, setCart, setCheckoutButton, setOrderId } from '../localStorage';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})
export class NavMobileComponent implements OnInit {

  vimeoIcon = faVimeoV;
  instagramIcon = faInstagram;
  facebookIcon = faFacebookF;
  menuIcon = faBars;
  ord: string = '';
  cart: any;
  badgeHidden: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
}
