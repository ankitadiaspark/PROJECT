import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";
import { CustomerDetailsComponent } from "../components/customer-details/customer-details.component";
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from "@angular/common/http";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
describe('DialogService', () => {
    let service: DialogService;
    let confirmDialogComponent: ConfirmDialogComponent;
    let fixtureConfirmDialogComponent: ComponentFixture<ConfirmDialogComponent>;
    let customerDetailsComponent: CustomerDetailsComponent;
    let fixtureCustomerDetailsComponent: ComponentFixture<CustomerDetailsComponent>;
    let id: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConfirmDialogComponent,
                CustomerDetailsComponent
            ],
            imports: [
                MatDialogModule,
                BrowserAnimationsModule,
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} },
                { provide: HttpClient, useValue: {} },
            ],
        })
        .compileComponents();
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
              entryComponents: [ 
                  ConfirmDialogComponent,
                  CustomerDetailsComponent 
                ]
            },
          });
    });
    beforeEach(() => {
        fixtureConfirmDialogComponent = TestBed.createComponent(ConfirmDialogComponent);
        confirmDialogComponent = fixtureConfirmDialogComponent.componentInstance;

        fixtureCustomerDetailsComponent = TestBed.createComponent(CustomerDetailsComponent);
        customerDetailsComponent = fixtureCustomerDetailsComponent.componentInstance;
        
        service = TestBed.get(DialogService);
    });
    it('dialog service should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should execute confirmdialog', () => {
        service.openConfirmDialog(confirmDialogComponent);
        expect(service.openConfirmDialog).toBeTruthy();
    });
    it('should open form', () => {
        service.openForm(confirmDialogComponent);
        expect(service.openForm).toBeTruthy();
    });
});


