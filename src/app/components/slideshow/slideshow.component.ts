import { AfterViewInit, Component, Input, OnInit, HostListener } from '@angular/core';
import { getIndex, setIndex } from 'src/app/localStorage';
import { Image } from 'src/app/shop/Product';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit{

  @Input() slideIndex: any;
  @Input() slidesSet: Image[] = [];
  @Input() slidesId: string = '';
  @Input() slidesCaptions: string[] = [];
  slidesIdLocal: string = '';
  slides: any[] = [];
  captions: any[] = [];

  constructor() {}

  ngOnInit(): void{
    this.createSlidesCaptions(this.slidesCaptions);
    this.createSlidesSet(this.slidesSet);
    this.slidesIdLocal = this.slidesId;
    if(this.slidesId != 'main'){
      this.slideIndex = 0;
    }
  }

  createSlidesCaptions(captions: string[]){
    let newCaptions = captions.map((caption) => ({
      name: caption,
    })
    )
    this.captions = newCaptions;
  }
  createSlidesSet(slides: Image[]){
    if(this.captions[0] != undefined){
      let newSlides = slides.map((slide, index) => ({
        source: slide,
        indexOf: index+1,
        name: this.captions[index].name

      }))
      this.slides = newSlides;
    }
    else{
      let newSlides = slides.map((slide, index) => ({
        source: slide,
        indexOf: index+1,
      }))
      this.slides = newSlides;
    }
  }

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  currentSlide(n: number): void {
      this.slideIndex = n;
      this.showSlides(n);

  }
  showSlides(n: number): void {
    let i;
    const slides = Array.from(document.getElementsByClassName(this.slidesId) as HTMLCollectionOf<HTMLElement>);
    const dots = Array.from(document.getElementsByClassName('dots') as HTMLCollectionOf<HTMLElement>)[0];
    const dotsCurrent = Array.from(document.getElementsByClassName('dot-'+this.slidesId) as HTMLCollectionOf<HTMLElement>);
    // console.log(n)
    // console.log(slides.length)
    //all slides hide
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    //all dots inactive
    for (i = 0; i < dotsCurrent.length; i++) {
      dotsCurrent[i].className = dotsCurrent[i].className.replace(' active', '');
    }
    //activate current slide
    //going out of the gallery left and right
    if (n > slides.length - 1) {
      this.slideIndex = 0;
      slides[0].style.display = 'block';
      dotsCurrent[0].className += ' active';

    }
    if (n < 0) {
      this.slideIndex = slides.length;
      slides[slides.length - 1].style.display = 'block';
      dotsCurrent[slides.length - 1].className += ' active';

    }
    else{
      // this.slideIndex = n;
      slides[n].style.display = 'block';
      if(slides.length > 1){
        dotsCurrent[n].className += ' active';
      }
    }

    //save current slide if main slideshow
    if(this.slidesId === 'main'){
      setIndex(n.toString());
    }
  }

  //navigaye on let / right arrow keys
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.currentSlide(this.slideIndex + 1);
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.currentSlide(this.slideIndex - 1);
    }
  }

  //navigate on swipe right / left event
  onSwipe(evt: any) {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
    // posible usage of up / down swipe event
    // const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    console.log(x);
    if(x === 'right'){
      this.currentSlide(this.slideIndex - 1);
    }
    if(x === 'left'){
      this.currentSlide(this.slideIndex + 1);
    }
  }
}
