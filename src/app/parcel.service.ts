import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  constructor(private http: HttpClient) { }

  getParcels(): Observable<Parcel[]> {

    const url = "https://localhost:44378/api/Parcel";
    return this.http.get<Parcel[]>(url);

  }

  getUsers() {
    const url = "https://localhost:44378/api/Parcel";
    
    return this.http.get<string[]>(url);
  }

  postdatatoFirebase(userdetail: any)
  {
    //const nm = Math.floor(Math.random() * 1000);
    const url ="https://ngapi-e34e4-default-rtdb.firebaseio.com/customer.json";
    //const userdetail = {name: 'User'+nm.toString(), age: 35, Gender: 'Male', Address: 'JHB'};
    return this.http.post(url,userdetail);
  }

  getdatatoFirebase()
  {
    const url ="https://ngapi-e34e4-default-rtdb.firebaseio.com/customer.json";
   
    return this.http.get(url); 
  }

  deletedatatoFirebase(key: string)
  {
    const url ="https://ngapi-e34e4-default-rtdb.firebaseio.com/customer/" + key +".json";
    //https://ngapi-e34e4-default-rtdb.firebaseio.com/customer/-N4aZkVzv3ddJRM17uJ5.json
    return this.http.delete(url);
  }


}

export interface Parcel {
  
  wkt: string;
  data: string;
  lpkey: string;
}
