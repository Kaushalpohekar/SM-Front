import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/pages/login-page/login-page.component';
import { DashLayoutComponent } from './admin/admin-layout/dash-layout/dash-layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'admin',
    component: DashLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
