import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BodyComponent } from './admin-layout/body/body.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashLayoutComponent } from './admin-layout/dash-layout/dash-layout.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { HeaderComponent } from './admin-layout/header/header.component';
import { MaterialModule } from '../material/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ForwardComponent } from './pages/forward/forward.component';


@NgModule({
  declarations: [
    BodyComponent,
    DashLayoutComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ForwardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    MatMenuModule,
    OverlayModule
  ]
})
export class AdminModule { }
