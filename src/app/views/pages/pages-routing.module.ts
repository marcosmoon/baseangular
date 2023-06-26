import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';

import { LoginComponent } from './login/login.component';
import { GacetaIndexComponent } from './gaceta-index/gaceta-index.component';
import { GacetaIndexPdfComponent } from './gaceta-index-pdf/gaceta-index-pdf.component';
import { DefaultLayaoutGacetaComponent } from './containers/default-layaout-gaceta';



const routes: Routes = [
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  // {
  //   path: 'gaceta',
  //   component: DefaultLayaoutGacetaComponent,
  //   data: {
  //     title: 'gaceta'
  //   }
  // },
  // {
  //   path: 'gacetapdf',
  //   component: GacetaIndexPdfComponent,
  //   data: {
  //     title: 'gacetapdf'
  //   }
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
