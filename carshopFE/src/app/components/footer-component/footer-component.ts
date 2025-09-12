import { Component } from '@angular/core';
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-footer-component',
  imports: [
    NzFlexDirective,
    NzIconDirective
  ],
  templateUrl: './footer-component.html',
  styleUrls: ['./footer-component.css', '../../../assets/global-styles.scss']
})
export class FooterComponent {

  openLinkedInInNewWindow() {
    window.open('https://www.linkedin.com/in/bopielka/');
  }
}
