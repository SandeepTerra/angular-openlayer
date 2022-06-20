import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MyListComponent } from './mylist/mylist.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { MapviewerComponent } from './mapviewer/mapviewer.component';
import { FirebasedataComponent } from './firebasedata/firebasedata.component';

@NgModule({
  declarations: [
    AppComponent,
    MyListComponent,
    UserprofileComponent,
    MapviewerComponent,
    FirebasedataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
