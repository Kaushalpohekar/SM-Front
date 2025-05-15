import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { BodyComponent } from './user-layout/body/body.component';
import { HeaderComponent } from './user-layout/header/header.component';
import { SidebarComponent } from './user-layout/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { BleComponent } from './pages/ble/ble.component';
import { MtComponent } from './pages/mt/mt.component';
import { BleChatComponent } from './component/ble-chat/ble-chat.component';



@NgModule({
  declarations: [
    UserLayoutComponent,
    BodyComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    BleComponent,
    MtComponent,
    BleChatComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class UserModule { }
