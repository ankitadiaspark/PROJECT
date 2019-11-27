import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog'; // necesary to use components and directives of dialog module
import { MAT_DIALOG_DATA } from '@angular/material'; // necesary for inject and recip incoming data
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogRef } from "@angular/material";
import { ConfirmDialogComponent } from './confirm-dialog.component';


 describe('ConfirmDialogComponent', () => {
   let component: ConfirmDialogComponent;
   let fixture: ComponentFixture<ConfirmDialogComponent>;
   let dialogMock = {
    close: () => { }
};

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       declarations: [ ConfirmDialogComponent ],
       imports: [ MatDialogModule, BrowserDynamicTestingModule ], 
       providers: [{ provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} ,} 
       ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('dialog should be closed after closeDialog()', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.closeDialog();
    expect(spy).toHaveBeenCalled();    
  });
   
   
});





