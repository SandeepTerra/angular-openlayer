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

}

export interface Parcel {
  
  wkt: string;
  data: string;
  lpkey: string;
}
