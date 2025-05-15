import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BleComponent } from './pages/ble/ble.component';
import { MtComponent } from './pages/mt/mt.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'mt',
    component: MtComponent
  },
  {
    path: 'ble',
    component: BleComponent
  },
  {path:'**', redirectTo:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
