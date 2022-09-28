import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { faCopyright, faCode, faImages } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title = 'ZWR | Kontakt';
  description: MetaDefinition = {name: 'description', content: 'Masz pomysł na event? Chces wypożyczyć sprzęt? Skontaktuj się z nami'};

  copyIcon = faCopyright;
  codeIcon = faCode;
  imagesIcon = faImages;
  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    //SEO
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
  }

}
