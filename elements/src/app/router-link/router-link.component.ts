import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.css']
})
export class RouterLinkComponent implements OnInit {

  constructor() { }
  @Input() href: string;
  @Input() label: string;

  routerClicked(evt) {
    evt.preventDefault();
    history.pushState({}, this.label, this.href);
  }

  ngOnInit() {
  }

}
