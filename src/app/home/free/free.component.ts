import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit {
  @Input() until : Date;
  constructor() { }

  ngOnInit() {
  }

}
