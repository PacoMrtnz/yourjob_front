import { Component, OnInit } from '@angular/core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';

declare var googleTranslateElementInit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  ngOnInit() {
    new googleTranslateElementInit();
  }

  title = "YourJob";




}
