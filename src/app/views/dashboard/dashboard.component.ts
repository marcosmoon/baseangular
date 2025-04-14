import { Component, OnInit, ViewChild } from '@angular/core';
// import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { NotificationsService } from 'src/app/helpers/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  images = [
    'assets/images/logomayblancototal.png',
    'assets/images/angular.jpg',
    'assets/images/Loading.gif',
    'assets/images/upload.png'
  ];

  constructor(
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(){
  }


}
