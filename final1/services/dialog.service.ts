import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";
import { CustomerDetailsComponent } from "../components/customer-details/customer-details.component";


@Injectable({
  providedIn: 'root'
})
export class DialogService {


  constructor(public dialog: MatDialog) { }

  openConfirmDialog(msg: string | ConfirmDialogComponent) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data: {
        message: msg
      }
    });
  }

  openForm(id: number | ConfirmDialogComponent) {
    return this.dialog.open(CustomerDetailsComponent, {
      width: '80%',
      disableClose: true,
      data: {
        message: id
      }
    });
  }
}
