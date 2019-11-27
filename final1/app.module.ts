import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerService } from './services/customer.service';
import { MaterialModule } from './material/material.module' 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogService } from './services/dialog.service';
import { NotificationsService } from './services/notifications.service';
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    CustomerService, 
    DialogService, 
    NotificationsService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents:[
    CustomerDetailsComponent, 
    ConfirmDialogComponent
  ]
})
export class AppModule { }






