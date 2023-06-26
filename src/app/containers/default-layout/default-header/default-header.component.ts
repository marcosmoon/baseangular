import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {
  userActual = '';
  admin:boolean=false;
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService
    ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    if(this.authService.getUserData().rol.id == "A7C1420F-C98F-41FB-9F4F-D2246427DAA0"){
      this.admin = true;
    }
    this.userActual = this.authService.getUserData().rol.name;
  }

  logout(){
    this.authService.logout()
  }
}
