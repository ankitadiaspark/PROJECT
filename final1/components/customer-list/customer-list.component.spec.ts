import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerService } from "../../services/customer.service";
import { MatDialog, MatDialogRef, MatDialogModule, MatToolbarModule } from "@angular/material";
import { DialogService } from "../../services/dialog.service";
import { NotificationsService } from "../../services/notifications.service";
import { CustomerListComponent } from './customer-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource } from "@angular/material/table";
import { Customer } from "../../interfaces/customer";
import { of } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let service: CustomerService;
  let serviceNotification: NotificationsService;
  let dialog: MatDialog;
  let serviceDialog: DialogService;
  let dataSource: MatTableDataSource<Customer>;
  let dialogref: MatDialogRef<CustomerDetailsComponent>;
  let data;
  let details: Customer;
  let dialogMock = {
    afterClosed: () => { }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent, ConfirmDialogComponent],
      imports: [HttpClientTestingModule, FormsModule, MatTableModule, MatDialogModule, MatToolbarModule, MatIconModule, BrowserAnimationsModule],
      providers: [{ provide: MatTableDataSource, useValue: dialogMock }, { provide: MatDialogRef, entryComponents: ConfirmDialogComponent, useValue: dialogMock }, DialogService, { provide: DialogService, entryComponents: { CustomerDetailsComponent, ConfirmDialogComponent } }, { provide: MatDialog, useValue: {} }, NotificationsService, CustomerService, MatSnackBar, MatTableDataSource],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CustomerService);
    serviceNotification = TestBed.get(NotificationsService);
    serviceDialog = TestBed.get(DialogService);
    dialog = TestBed.get(MatDialog);
    dataSource = TestBed.get(MatTableDataSource);
    dialogref = TestBed.get(MatDialogRef);
    details = <Customer>{};
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should execute ngOninit()', () => {
    component.ngOnInit();
    spyOn(component, 'getcustomer');
    expect(component.getcustomer).toBeDefined();
  });


  it('should execute onSearchClear()', () => {
    component.dataSource = new MatTableDataSource();
    spyOn(component, 'onSearchClear').and.callThrough();
    component.searchKey = "";
    let spy = spyOn(component, 'applyFilter').and.callThrough();
    component.onSearchClear();
    expect(spy).toHaveBeenCalled();
    expect(component.onSearchClear).toBeDefined();
  });


  it('should execute onCreate()', () => {
    let cId = 0;
    component.onCreate();
    spyOn(component, 'onCreate');
    expect(component.onCreate).toHaveBeenCalledWith(cId);
    let app = serviceDialog;
    spyOn(app, 'openForm');
    expect(app.openForm).toHaveBeenCalledWith(cId);
    dialogref = component.dialogservice.openForm(cId);
    const response: Customer[] = [];
    spyOn(dialogref, 'afterClosed').and.returnValue(of(response));
    spyOn(component, 'getcustomer').and.callThrough();
  });

  xit('should execute onCreate()', () => {
    let cId = 0;
    component.onCreate();
    spyOn(component, 'onCreate');
    expect(component.onCreate).toHaveBeenCalledWith(cId);
    let app = serviceDialog;
    spyOn(app, 'openForm');
    expect(app.openForm).toHaveBeenCalledWith(cId);
    let openforms = component.dialogservice.openForm(cId);
    const response: Customer[] = [];
    spyOn(serviceDialog, 'openForm').and.callThrough();
    spyOn(component, 'getcustomer').and.callThrough();
  });


  it('should execute getcustomer()', () => {
    const response: Customer[] = [];
    let app = component.service;
    spyOn(app, 'getCustomerList').and.returnValue(of(response))
    component.getcustomer();
    expect(Component).toBeTruthy();
  });


  it('should execute lower()', () => {
    component.lower(Object);
    expect(component).toBeTruthy();
  });

  it('should execute lower()', () => {
    let obj = {
      cId: 47,
      firstname: "John",
      lastname: "Carter",
      date: new Date(),
      email: "john.carter@diaspark.com",
      mobileNo: "7411536056",
      address: "Indore",
      city: "Indore",
      state: "MP",
      pin: "461223",
      country: "India"
    }
    component.lower(obj);
    expect(component).toBeTruthy();
  });


  it('should execute delete()', () => {
    let cId = 0;
    component.delete(cId);
    expect(component).toBeTruthy();
  });

  it('should execute onEdit()', () => {
    let cId = 0;
    component.onEdit(cId);
    spyOn(component, 'onEdit');
    expect(component.onEdit).toHaveBeenCalledWith(cId);
    spyOn(serviceDialog, 'openForm');
    expect(serviceDialog.openForm).toHaveBeenCalledWith(cId);
    let openforms = component.dialogservice.openForm(cId);
    spyOn(serviceDialog, 'openForm');
    spyOn(openforms, 'afterClosed').and.returnValue(of())
    component.getcustomer();
    expect(component).toBeTruthy();
  });
});


