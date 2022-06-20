import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelService } from '../parcel.service';

@Component({
  selector: 'app-firebasedata',
  templateUrl: './firebasedata.component.html',
  styleUrls: ['./firebasedata.component.css']
})
export class FirebasedataComponent implements OnInit {

  userdetail = { name: '', age: 0, gender: 'Male', address: '' };
  message = '';
  userdata: any[] = [];

  constructor(private parcelService: ParcelService, private router: Router) {

  }

  ngOnInit(): void {
      
    this.fetchData();
  }

  fetchData() {

    //let a = {userdetail: this.userdetail, id: 1, class: 'A' };
    this.parcelService.getdatatoFirebase()
      .subscribe(
        res => {
          //let a = res;
          for(const d in res) {
           
            const dd = (<any>res)[d];
            const a  = {address: dd.address, age: dd.age, gender: dd.gender, name: dd.name, key: d};
            this.userdata.push(a);
              //this.userdata.push();
          }
        },
        error => {
          console.log(error); // error path
        }
      );
  }

  addData() {
    this.message = 'Adding data';
    
    //let a = {userdetail: this.userdetail, id: 1, class: 'A' };
    this.parcelService.postdatatoFirebase(this.userdetail)
      .subscribe(
        res => {
          const a  = {address: this.userdetail.address, age: this.userdetail.age, gender: this.userdetail.gender, name: this.userdetail.name, key: (<any>res)['name']};
          this.userdata.push(a);
          this.message = 'Data Addedd successfully.';
          
          //let a = res;
        },
        error => {
          console.log(error); // error path
        }
      );
  }

  deleteData(keyVal: string) {
    
    //let index = this.userdata.Fin((item: { key: string; }) => item.key == keyVal);

    //const index = this.userdata.findIndex((item: { key: string; }) => item.key == keyVal);
    if(confirm("Do want to delete this record?")) {
      this.message = 'deleting data';
      this.parcelService.deletedatatoFirebase(keyVal)
      .subscribe(
        res => {
          //this.userdata.slice(index,1);
          this.userdata = this.userdata.filter(function( obj ) {
            return obj.key !== keyVal;
        });
          this.message = 'Data deleted successfully.';
        },
        error => {
          console.log(error); // error path
        }
      );
    }
  }

}
