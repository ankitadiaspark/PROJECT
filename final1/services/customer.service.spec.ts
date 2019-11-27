import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Customer } from "../interfaces/customer";
import { HttpTestingController } from '@angular/common/http/testing';
describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  let details:Customer;
  let id:number;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.get(CustomerService);
    httpMock = TestBed.get(HttpTestingController);
    details = <Customer>{};
    id=0;
  });
  it('customer service should be created', () => {
    const service: CustomerService = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });
  it('be able to retrieve customers from the API via GET', () => {
    const customers: Customer[] = [{
        cId : 47,
        firstname : "John",
        lastname :"Carter",
        date  : new Date(),
        email : "john.carter@diaspark.com",
        mobileNo : "7411536056",
        address : "Indore",
        city : "Indore",
        state : "MP",
        pin : "461223",
        country : "India"
      }, {
        cId : 48,
        firstname : "Robert",
        lastname :"Deep",
        date  : new Date(),
        email : "robert.deep@diaspark.com",
        mobileNo : "7189895678",
        address : "Bhopal",
        city : "Bhopal",
        state : "MP",
        pin : "461223",
        country : "India"
    }];
    service.getCustomerList().subscribe(data => {
        expect(data.length).toBe(2);
        
    });
    const request = httpMock.expectOne(`${service.baseURL}/customer`);
    expect(request.request.method).toBe('GET');
    request.flush(customers);
  });

  //to execute postcustomer()
  it('should be able to post the details of customer from the api via post', () => {
    const customers: Customer[] = [];
    details["cId"] = 0;
    service.postCustomer(details).subscribe(data => {
        expect(data).toEqual(customers);
    });
    const request = httpMock.expectOne(`${service.baseURL}/customer`);
    expect(request.request.method).toBe('POST');
    request.flush(customers);
  });

//to execute updatecustomer()
it('should be able to update the details of customer from the api via put', () => {
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.updateCustomer(details).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer/${details.cId}`);
  expect(request.request.method).toBe('PUT');
  request.flush(customers);
});

//to execute removecutomer()
it('should be able to remove the customer from the api via delete', () => {
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.removeCustomer(id).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer/${id}`);
  expect(request.request.method).toBe('DELETE');
  request.flush(customers);
});

//to execute getCustomerById()
it('should be able to get only one customer from the api via get', () => {
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.getCustomerbyid(id).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer/${id}`);
  expect(request.request.method).toBe('GET');
  request.flush(customers);
});


//UPDATE RESPONSE
it('response type should be JSON',()=>{
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.updateCustomer(details).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer/${details.cId}`);
  expect(request.request.responseType).toBe('json');
  request.flush(customers);
});
//GET RESPONSE
it('response type should be JSON', () => {
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.getCustomerbyid(id).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer/${id}`);
  expect(request.request.responseType).toBe('json');
  request.flush(customers);
});
//PUT RESPONSE
it('response type should be JSON', () => {
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.updateCustomer(details).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer/${details.cId}`);
  expect(request.request.responseType).toBe('json');
  request.flush(customers);
});
//DELETE RESPONSE
it('response type should be JSON', () => {
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.removeCustomer(id).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer/${id}`);
  expect(request.request.responseType).toBe('json');
  request.flush(customers);
});
//POST RESPONSE
it('response type should be JSON', () => {
  const customers: Customer[] = [];
  details["cId"] = 0;
  service.postCustomer(details).subscribe(data => {
      expect(data).toEqual(customers);
  });
  const request = httpMock.expectOne(`${service.baseURL}/customer`);
  expect(request.request.responseType).toBe('json');
  request.flush(customers);
});



  afterEach(() => {
    httpMock.verify();
  });
});


