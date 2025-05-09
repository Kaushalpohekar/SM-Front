import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login/pages/login-page/login-page.component';
import { DashLayoutComponent } from './admin/admin-layout/dash-layout/dash-layout.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { AuthGuard } from './login/service/auth.guard';
import { RoleGuard } from './service/role.guard';
import { LoginGuard } from './login/service/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'a',
    component: DashLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
    ]
  },
  {
    path: 'u',
    component: UserLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['user'] },
    children: [
      { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
