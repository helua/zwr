import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/shop/Product';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { getIndex, setIndex } from 'src/app/localStorage';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
@Component({
  selector: 'app-slideshow-main',
  templateUrl: './slideshow-main.component.html',
  styleUrls: ['./slideshow-main.component.scss']
})
export class SlideshowMainComponent implements OnInit {

  slideIndex: number = 0;
  @Input() slidesSet: Image[] = [];
  @Input() slidesId: string = '';
  @Input() slidesCaptions: string[] = [];

  constructor() {
  }

  ngOnInit(): void{
      this.slideIndex = parseInt(getIndex());
  }

}
