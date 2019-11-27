import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Customer } from "../interfaces/customer";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class CustomerService {
  url: string;
  header: any;
  readonly baseURL = environment.apiBaseUrl;

  constructor(public http: HttpClient) {}
  
  //post request to add new customer
  postCustomer(details: Customer) {
    details["cId"] = 0;
    const options = {
      headers: new HttpHeaders({ "content-type": "application/json" })
    };
    return this.http.post<Customer[]>(
      this.baseURL + "/customer",
      details,
      options
    );
  }

  //Get Request to get customer list
  getCustomerList(): Observable<any> {
    return this.http.get<any>(this.baseURL + "/customer", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  //Put api for details updation
  updateCustomer(formdata: Customer) {
    const options = {
      headers: new HttpHeaders({ "content-type": "application/json" })
    };

    return this.http.put(
      this.baseURL + "/customer/" + `${formdata.cId}`,
      formdata,
      options
    );
  }

  //Delete api for remove Customer from list
  removeCustomer(id): Observable<Customer[]> {

    const options = {
      headers: new HttpHeaders({"Content-Type": "application/json"})
    };
    return this.http.delete<Customer[]>(this.baseURL + "/customer/" + `${id}`,options);
  }

  //Get details of on Customer
  getCustomerbyid(id) : Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseURL + "/customer/"+ `${id}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}


