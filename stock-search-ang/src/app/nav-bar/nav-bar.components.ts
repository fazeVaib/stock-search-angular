import {Component} from '@angular/core';

@Component({
  selector: 'top-nav-bar',
  templateUrl: './nav-bar.components.html',
  styleUrls: ['./nav-bar.components.css']
})

export class TopNavBar {
  public isMenuCollapsed = true;
}
