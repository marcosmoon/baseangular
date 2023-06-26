import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/authentication/auth.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {


  public navItems = [] ;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
    private autService: AuthService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
  }
}
