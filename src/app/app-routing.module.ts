import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { LoginComponent } from './views/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { GacetaAddComponent } from './views/core/gaceta-manage/gaceta-add/gaceta-add.component';
import { GacetaIndexComponent } from './views/pages/gaceta-index/gaceta-index.component';
import { GacetaIndexPdfComponent } from './views/pages/gaceta-index-pdf/gaceta-index-pdf.component';
import { SliderManageComponent } from './views/core/slider-manage/slider-manage.component';
import { SliderAddComponent } from './views/core/slider-manage/slider-add/slider-add.component';
import { DefaultLayaoutGacetaComponent } from './views/pages/containers/default-layaout-gaceta/default-layaout-gaceta.component';
import { GacetaHistoriaComponent } from './views/pages/gaceta-historia/gaceta-historia.component';
import { GacetaFestividadesComponent } from './views/pages/gaceta-festividades/gaceta-festividades.component';
import { GacetaFormasVestirComponent } from './views/pages/gaceta-formas-vestir/gaceta-formas-vestir.component';
import { GacetaEstructuraOrganicaComponent } from './views/pages/gaceta-estructura-organica/gaceta-estructura-organica.component';
import { GacetaMarcoNormativoComponent } from './views/pages/gaceta-marco-normativo/gaceta-marco-normativo.component';




const routes: Routes = [
  {
    path: 'administration',
    redirectTo: 'dashboard',
    pathMatch: 'full',

  },
  {
    path: '',
    canActivateChild: [AuthGuard],
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'pages', loadChildren: () => import('./views/pages/pages.module').then((m) => m.PagesModule), canActivate: [AuthGuard] },
      { path: 'gacetas/gaceta', component: GacetaAddComponent, canActivate: [AuthGuard]},
      { path: 'slider', component: SliderManageComponent, data: { title: 'gaceta' } },
      { path: 'slider/imagen', component: SliderAddComponent, data: { title: 'gaceta' } },
    ]
  },
  {
    path: 'index',
    component: DefaultLayaoutGacetaComponent,
    data: {
      title: 'San Pedro Totolapam'
    },
    children: [
      { path: '', component: GacetaIndexComponent},
      { path: 'historia', component: GacetaHistoriaComponent, data: { title: 'Historia' } },
      { path: 'festividades', component: GacetaFestividadesComponent, data: { title: 'Festividades' } },
      { path: 'estructura', component: GacetaEstructuraOrganicaComponent, data: { title: 'Estructura' } },
      { path: 'marconormativo', component: GacetaMarcoNormativoComponent, data: { title: 'Marco' } },
      { path: 'formasvestir', component: GacetaFormasVestirComponent, data: { title: 'Formas de Vestir' } },
      { path: 'gacetapdf', component: GacetaIndexPdfComponent, data: { title: 'Gaceta' } },
    ]
  },
  { path: '404', component: Page404Component, data: { title: 'Page 404' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
