import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {

  title = 'ZWR event agency';
  description: MetaDefinition = {name: 'description', content: 'Zawierucha ZWR agencja eventowa i wypożyczalnia sprzętu'};

  constructor(private titleService: Title, private metaService: Meta){}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
  }

}
