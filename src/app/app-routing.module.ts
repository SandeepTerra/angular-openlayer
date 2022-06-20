import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirebasedataComponent } from './firebasedata/firebasedata.component';
import { MapviewerComponent } from './mapviewer/mapviewer.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: 'userprofile',
    component: UserprofileComponent
  },
  {
    path: 'mapviewer',
    component: MapviewerComponent
  },
  {
    path: 'firebasedata',
    component: FirebasedataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
