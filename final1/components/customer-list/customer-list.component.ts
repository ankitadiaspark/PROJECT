import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { CustomerService } from "../../services/customer.service";
import { Customer } from "../../interfaces/customer";
import { MatDialog } from "@angular/material";
import { DialogService } from "../../services/dialog.service";
import { NotificationsService } from "../../services/notifications.service";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = [
    "firstname",
    "email",
    "address",
    "mobileNo",
    "actions"
  ];
  dataFromService: Customer[];
  editdata: Customer[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  selection = new SelectionModel<Customer>(true, []);
  searchKey: string;
  store: string;
  dataSource: MatTableDataSource<Customer>;

  constructor(
    public service: CustomerService,
    public dialog: MatDialog,
    public dialogservice: DialogService,
    public notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.getcustomer();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  //new form
  onCreate() {
    this.dialogservice
      .openForm(0)
      .afterClosed()
      .subscribe(res => {
        this.getcustomer();
      });
  }
  //view customer in form
  onEdit(row) {
    this.dialogservice
      .openForm(row.cId)
      .afterClosed()
      .subscribe(() => {
        this.getcustomer();
      });
  }

  //delete records from table
  delete(row) {
    let data = row.cId;
    this.dialogservice
      .openConfirmDialog("Are you sure to delete this record ?")
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.service.removeCustomer(data).subscribe(
            data => {
              // console.log(data);
              this.getcustomer();
            },
            () => console.log("error")
          );
          this.notificationService.warn("! Deleted successfully");
        }
      });
  }

  //get data from service for table
  getcustomer() {
    this.service.getCustomerList().subscribe(response => {
      this.dataFromService = response.customerList;
      this.lower(this.dataFromService);
      this.dataSource = new MatTableDataSource(this.dataFromService);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  lower(obj) {
    for (var values in obj) {
      if (typeof obj[values] === "string") {
        obj[values] = obj[values].toLowerCase();
      }
      if (typeof obj[values] === "object") {
        this.lower(obj[values]);
      }
    }
    return obj;
  }

}
