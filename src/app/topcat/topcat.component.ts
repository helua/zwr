import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-topcat',
  templateUrl: './topcat.component.html',
  styleUrls: ['./topcat.component.scss']
})
export class TopcatComponent implements OnInit {
  title = 'ZWR | TOP CAT ';
  description: MetaDefinition = {name: 'description', content: 'TOP CAT - mixed ultimate tournament by ZWR, 28-30/7/2022 Pułtusk, Poland'};


  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    //SEO
    this.titleService.setTitle(this.title);
    this.metaService.updateTag(this.description);
  }

}
