import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/authentication/auth.service';
import { environment } from 'src/environments/environment';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NotificationsService } from './helpers/notifications.service';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;


  title = 'Editor Pdf';

  private timeoutRefreshToken = environment.timeoutRefreshToken;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private autService: AuthService,
    private idle: Idle,
    private keepalive: Keepalive,
    private notification: NotificationsService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    if (this.autService.isLoggedIn()) {
      this.autService.setUserLogged(true);
    }
    else {
      this.autService.setUserLogged(false);
    }

    this.startTimeOut()
  }


  startTimeOut() {
    let time = (+this.timeoutRefreshToken - 2) * 60;

    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(time);

    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(60);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    //this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.autService.logout();
      this.notification.info({ text: 'Sesión terminada por inactividad' })

    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'

      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);
    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.autService.getUserLogged().subscribe((userLoggedIn: boolean) => {
      if (userLoggedIn) {
        console.log("TIMEOUT START");
        this.idle.watch()
        this.timedOut = false;
      }
      else {
        console.log("TIMEOUT STOP");
        this.idle.stop();
      }
    });

    this.autService.getRefreshedToken().subscribe((refreshedToken: boolean) => {
      if (refreshedToken) {
        this.reset();
        this.autService.setRefreshedToken(false);
      }
    })
  }

  reset() {
    console.log("TIMEOUT RESET");
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }
}
