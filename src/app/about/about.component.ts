import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { InstaService } from '../insta.service';
import { faFacebookF, faInstagram, faVimeoV } from '@fortawesome/free-brands-svg-icons';
import { getIndex, setIndex } from 'src/app/localStorage';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewChecked {

  title = 'ZWR 🥏 Drużyna';
  logo = '../../assets/ZWR_logo.jpg'
  description: MetaDefinition = {name: 'description', content: 'Drużyna ultimate frisbee Zawierucha Warszawa'};
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
  titles: string[] = [
    "PMP 2016",
    "WHOSE BABY 2014",
    "MOGILNO 2014",
    "HMP 2019",
    "HMP 2020",
    "MPX 2019",
    "ZWYROLKI",
    "PMP 2019",
    "PMP 2019",
    "WLU 2019/20"
  ];
  instagramToken: any;
  instagramString: string ='IGQVJWUkI2SUxOQUxRVk95U1d1WldHQ3pvYlFaaUc4SUR2MjAxRzk3SVR3dk9SUk5SUEdOMnFRWkgtMC1ZAMXdoUnExTU9TMGstWjVnbFZAfekNyZAU9iWGlUYlMyT3lCMl9tWENod3kyNHZArMS11UlJHYgZDZD';
  // instagramString: string ='IGQVJYWUpaRHJvV0VpWEJRRFBGNVlOS0Eycm44SXNuXzRLdGVSN1BqcnQwR3cxVktfS29Ra3RpWWlSWmxLMHJpaFdvZAEZApN3hsV1NnZA1pVeWx3RjU3ZAUhvam52ZAFhCMEJUVDExYjJ3';
  vimeoIcon = faVimeoV;
  instagramIcon = faInstagram;
  facebookIcon = faFacebookF;

  constructor(private titleService: Title, private metaService: Meta, private insta: InstaService){}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
      // this.getToken();
      // this.getFeed();
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
      a[i].style.width = "300px"
      a[i].style.height = "300px"
      a[i].style.display = "flex"
      // a[i].style.width = "31%"
      a[i].style.margin = "10px"
      }
      for (i = 0; i < a.length; i++) {
      img[i].style.width = "300px"
      img[i].style.height = "fitContent"
      img[i].style.display = "flex"
      img[i].style.flexDirection = "column"
      img[i].style.justifyContent = "center"
      img[i].style.margin = "auto"

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
