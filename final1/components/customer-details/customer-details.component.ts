import { Component, OnInit, Inject } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NotificationsService } from "../../services/notifications.service";
import { Customer } from "../../interfaces/customer";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from "underscore";


@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.css"]
})
export class CustomerDetailsComponent implements OnInit {
  userdata: Customer[];
  datalist: Customer[];
  mobilePattern: string | RegExp = /^\d\d\d\d\d\d\d\d\d\d$/;
  pinPattern: string | RegExp = /^\d\d\d\d\d\d$/;
  changedemail: Customer;
  email: Customer;
  ;
  constructor(
    public service: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    public notificationService: NotificationsService,

  ) { }

  formcid: any
  form: FormGroup

  ngOnInit() {
    this.service.getCustomerList().subscribe(response => {
      this.datalist = response.customerList;
    });
    this.form = new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      lastname: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      email: new FormControl("", [Validators.email, Validators.required, Validators.maxLength(100)]),
      mobileNo: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.mobilePattern)]),
      address: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      date: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      state: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      country: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      cId: new FormControl(""),
      pin: new FormControl("", [
        Validators.required,
        Validators.pattern(this.pinPattern)
      ])
    });
    this.formcid = this.data.message;
    if (!this.formcid) {
      this.initializeFormGroup();
    }
    if (this.formcid) {
      this.service
        .getCustomerbyid(this.formcid)
        .subscribe(
          res => (this.userdata = res),
          err =>
            () => this.populateForm(this.userdata)
        );
    }
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();

  }
  onSubmit() {

    if (this.form.valid) {
      if (this.form.pristine) {
        this.notificationService.success("No changes");
        this.onClose();
      }
      else {
        const formData = this.form.value;
        if (!this.form.get("cId").value) {
          this.service.postCustomer(formData).subscribe(data => this.notificationService.success(" submited successfully "),
            err => {
              this.notificationService.warn(" email already exits")
            },
            () => this.onClose()
          );
        } else {
          const formData = this.form.value;
          this.email = _.findWhere(this.datalist, { cId: this.form.value.cId, email: this.form.value.email });
          this.changedemail = _.findWhere(this.datalist, { email: this.form.value.email });
          if (this.email) {
            this.service.updateCustomer(formData).subscribe(data =>
              this.notificationService.success(" updated  successfully "),
              err =>
                () => this.onClose()
            );
          }

          if (!this.changedemail) {
            this.service.updateCustomer(formData).subscribe(data =>
              this.notificationService.success(" updated  successfully "),
              err =>
                () => this.onClose()
            );
          }
          if (this.changedemail) {
            this.notificationService.warn("Email already Exists ");
          }
        }
      }
    }
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close("");
  }

  //initializeformgroup
  initializeFormGroup() {
    this.form.setValue({
      firstname: "",
      lastname: "",
      email: "",
      mobileNo: "",
      address: "",
      date: "",
      city: "",
      cId: "",
      country: "",
      pin: "",
      state: ""
    });
  }

  //populateform
  populateForm(customer) {
    this.form.setValue(customer);
  }
}
