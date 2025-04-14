import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolboxComponent } from './views/core/toolbox/toolbox.component';

const routes: Routes = [
  {
    path: '',
    component: ToolboxComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}