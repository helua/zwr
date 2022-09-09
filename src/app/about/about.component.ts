import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { InstaService } from '../insta.service';
import { Image } from '../shop/Product';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewChecked {

  title = 'ZWR | O nas';
  logo = '../../assets/ZWR_logo.jpg'
  description: MetaDefinition = {name: 'description', content: 'Historia Tipiknapa zdecydowanie nie należy do tych klasycznych. Poznaj historię sklepu Knapa i wartości, za którymi stoimy tworząc kolejne produkty dla Ciebie.'};
  bigPhotoUrl: string = '../../assets/about/big/';
  smallPhotoUrl: string = '../../assets/about/small/';
  images: any[] = [
    "../../assets/1.jpg",
    "../../assets/2.jpg",
    "../../assets/3.jpg",
    "../../assets/4.jpg",
    "../../assets/5.jpg",
    "../../assets/6.jpg",
    "../../assets/7.jpg",
    "../../assets/8.jpg",
    "../../assets/9.jpg",
    "../../assets/10.jpg"
  ];
  instagramToken: any;
  instagramString: string ='IGQVJYWUpaRHJvV0VpWEJRRFBGNVlOS0Eycm44SXNuXzRLdGVSN1BqcnQwR3cxVktfS29Ra3RpWWlSWmxLMHJpaFdvZAEZApN3hsV1NnZA1pVeWx3RjU3ZAUhvam52ZAFhCMEJUVDExYjJ3';

  constructor(private titleService: Title, private metaService: Meta, private insta: InstaService){}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
    this.getToken();
    this.getFeed();
  }

  getToken(){
    this.insta.refreshToken().subscribe(t => {
      this.instagramToken = t;
      this.instagramString = this.instagramToken.Token;
    });


  }
  getFeed(){
    var Instafeed = require("../../scripts/instafeed.min.js");
    var feed = new Instafeed({
      accessToken: this.instagramString
      });
      feed.run();
  }

  ngAfterViewChecked(){
    const a = Array.from(document.getElementById('instafeed')?.getElementsByTagName('a') as HTMLCollectionOf<HTMLElement>);
    const img = Array.from(document.getElementById('instafeed')?.getElementsByTagName('img') as HTMLCollectionOf<HTMLElement>);
    if(1>0){
      let i;
      for (i = 0; i < a.length; i++) {
      // a[i].style.width = "300px"
      a[i].style.height = "300px"
      a[i].style.display = "table-cell"
      a[i].style.verticalAlign = "middle"
      a[i].style.margin = "1.5%"
      }
      for (i = 0; i < a.length; i++) {
      img[i].style.width = "300px"
      img[i].style.display = "block"
      }
    }else{
      let i;
      for (i = 0; i < a.length; i++) {
      a[i].style.width = "230px"
      a[i].style.height = "230px"
      a[i].style.display = "block"
      a[i].style.margin = "1%"
      }
      for (i = 0; i < a.length; i++) {
      img[i].style.width = "230px"
      img[i].style.display = "block"
      }

    }

  }

}
