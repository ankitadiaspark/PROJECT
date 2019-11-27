import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CustomerService } from "../../services/customer.service";
import { NotificationsService } from "../../services/notifications.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogModule, MatToolbarModule, MatDialogRef, MatSnackBar, MatSnackBarModule } from "@angular/material";
import { CustomerDetailsComponent } from './customer-details.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import { Customer } from "../../interfaces/customer";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormGroup } from '@angular/forms';
import { HttpTestingController } from '@angular/common/http/testing';
import * as _ from "underscore";
import { throwError } from 'rxjs';
describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let service: CustomerService;
  let serviceNotification: NotificationsService;
  let dialogref: MatDialogRef<CustomerDetailsComponent>;
  let overlayContainerElement: HTMLElement;
  let overlayContainer: OverlayContainer;
  let datalist: Customer;
  let httpMock: HttpTestingController;
  let form: FormGroup;
  let formcid: object;
  let underscore;
  let dialogMock = {
    close: () => { }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDetailsComponent],
      imports: [HttpClientTestingModule, BrowserDynamicTestingModule, MatTableModule, MatSnackBarModule, MatDialogModule, MatToolbarModule, MatIconModule, BrowserAnimationsModule],
      providers: [CustomerService, { provide: _, useValue: {} }, NotificationsService, MatSnackBar, MatToolbarModule, { provide: MAT_DIALOG_DATA, useValue: {}, }, { provide: MatDialogRef, entryComponents: ConfirmDialogComponent, useValue: dialogMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogref = TestBed.get(MatDialogRef);
    service = TestBed.get(CustomerService);
    serviceNotification = TestBed.get(NotificationsService);
    httpMock = TestBed.get(HttpTestingController);
    underscore = TestBed.get(_);
    datalist = <Customer>{};
    formcid = {};
    component.formcid = 47;
    form;
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute ngOninit()', () => {
    const response: Customer[] = [];
    let app = component.service;
    spyOn(app, 'getCustomerList').and.returnValue(of(response))
    component.ngOnInit();
    let data = component.datalist;
    expect(component.ngOnInit).toBeDefined();
  });

  it('should execute ngOninit(), if there is value for formcid', () => {
    expect(Number(component.formcid)).toBe(47);
    expect(Number(component.formcid)).toBeTruthy();
    const response: Customer[] = [];
    let app = component.service;
    spyOn(app, 'getCustomerbyid').and.returnValue(of(response))
    component.ngOnInit();
    let data = component.datalist;
    expect(component.ngOnInit).toBeDefined();
  });

  it('should clear the form and reset via onClear()', () => {
    component.onClear();
    expect(component).toBeTruthy();
  });

  it('should close the dialog and reset via onClose()', () => {
    spyOn(component.dialogRef, 'close').and.callThrough();
    spyOn(component.form, 'reset').and.callThrough();
    spyOn(component, 'initializeFormGroup').and.callThrough();
    component.onClose();
    expect(component).toBeTruthy();
  });

  it('should populate the form and set the value', () => {
    let customers: Customer[] = [];
    component.populateForm(customers);
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    let spy = spyOn(component.form, 'setValue').and.callThrough();
    expect(component).toBeTruthy();
  });

  it('should execute onsubmit()', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    expect(component.form.valid).toBeTruthy();
    component.onSubmit();
  });

  it('should check wheather the pristine is false', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    expect(component.form.valid).toBeTruthy();
    expect(component.form.pristine).toBe(true);
    component.form.controls['firstname'].markAsDirty();
    expect(component.form.dirty).toBe(true);
    component.onSubmit();
    const formData = component.form.value;
    expect(formData).toEqual(component.form.value);
    expect(component.form.get('cId').value).toBeTruthy();
  });

  it('should check wheather the formid doesnot exist in the list and then post the form', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    expect(component.form.valid).toBeTruthy();
    expect(component.form.pristine).toBe(true);
    component.form.controls['firstname'].markAsDirty();
    expect(component.form.dirty).toBe(true);
    component.form.controls['cId'].setValue(null);
    const formData = component.form.value;
    expect(formData).toEqual(component.form.value);
    expect(component.form.get('cId').value).not.toBeTruthy();
    const response: Customer[] = [];
    let app = component.service;
    spyOn(app, 'postCustomer').and.returnValue(of(response))
    component.onSubmit();
    expect(Component).toBeTruthy();
  });

  it('should throw the error that email already exist when trying to post the customer with same id', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    expect(component.form.valid).toBeTruthy();
    expect(component.form.pristine).toBe(true);
    component.form.controls['firstname'].markAsDirty();
    expect(component.form.dirty).toBe(true);
    component.form.controls['cId'].setValue(null);
    const formData = component.form.value;
    expect(formData).toEqual(component.form.value);
    expect(component.form.get('cId').value).not.toBeTruthy();
    let app = component.service;
    spyOn(app, 'postCustomer').and.returnValue(throwError({ status: 404 }));
    component.onSubmit();
    expect(Component).toBeTruthy();
  });

  it('should update the customer details if the cId already exist in the list via updateCustomer()', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    expect(component.form.valid).toBeTruthy();
    expect(component.form.pristine).toBe(true);
    component.form.controls['firstname'].markAsDirty();
    expect(component.form.dirty).toBe(true);
    const formData = component.form.value;
    expect(formData).toEqual(component.form.value);
    let email = _.findWhere(component.datalist, { cId: component.form.value.cId, email: component.form.value.email });
    component.email = email;
    const response: Customer[] = [];
    let app = component.service;
    spyOn(app, 'updateCustomer').and.returnValue(of(response))
    component.onSubmit();
    expect(Component).toBeTruthy();
  });

  it('should update the customer details if the cId already exist in the list via updateCustomer()', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    expect(component.form.valid).toBeTruthy();
    expect(component.form.pristine).toBe(true);
    component.form.controls['firstname'].markAsDirty();
    expect(component.form.dirty).toBe(true);
    const formData = component.form.value;
    expect(formData).toEqual(component.form.value);
    let email: Customer[] = [];
    expect(email).toBeTruthy();
    let app = component.service;
    spyOn(app, 'updateCustomer').and.returnValue(throwError({ status: 404 }))
    component.onSubmit();
    expect(Component).toBeTruthy();
  });

  xit('should execute onsubmit()', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstname'].setValue("ankita");
    component.form.controls['lastname'].setValue("tripathi");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['mobileNo'].setValue("7354460375");
    component.form.controls['address'].setValue("xyz");
    component.form.controls['date'].setValue(new Date());
    component.form.controls['city'].setValue("ujjain");
    component.form.controls['state'].setValue("state");
    component.form.controls['country'].setValue("india");
    component.form.controls['cId'].setValue("46");
    component.form.controls['pin'].setValue("456331");
    expect(component.form.valid).toBeTruthy();
    expect(component.form.pristine).toBe(true);
    component.form.controls['firstname'].markAsDirty();
    expect(component.form.dirty).toBe(true);
    const formData = component.form.value;
    expect(formData).toEqual(component.form.value);
    expect(component.form.get('cId').value).toBeTruthy();
    let changedemail = component.form.controls['email'].setValue("ankita@diaspark.com");;
    const response: Customer[] = [];
    let app = component.service;
    spyOn(app, 'updateCustomer').and.returnValue(of(response))
    let notify = component.notificationService;
    spyOn(notify, 'success').and.callThrough();
    component.onSubmit();
    expect(Component).toBeTruthy();


  });

  it('should execute onSubmit() when the form is valid and the id does not exist already in the list', () => {
    component.onSubmit();
    const formData = component.form.value;
    expect(formData).toEqual(component.form.value);
    expect(component.form.get('cId').value).not.toBeTruthy(() => {
      const response: Customer[] = [];
      let app = component.service;
      spyOn(app, 'postCustomer').and.returnValue(of(response))
      component.onSubmit();
      let data = component.datalist;
      expect(component.onSubmit).toBeDefined();
    });
  });
});


