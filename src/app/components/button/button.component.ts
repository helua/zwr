import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string = "";
  @Input() orderId: string = '';
  @Input() link : string = '';
  @Input() token : string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
