import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WrapperComponent } from './home/wrapper/wrapper.component';
import { FreeComponent } from './home/free/free.component';
import { OccupiedComponent } from './home/occupied/occupied.component';
import { ReservedComponent } from './home/reserved/reserved.component';
import {HttpClientModule} from '@angular/common/http';
import { NewReservationComponent } from './home/new-reservation/new-reservation.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocomplete, MatAutocompleteModule, MatInput, MatInputModule, MatTabsModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NoConnectionComponent } from './home/no-connection/no-connection.component';
import { FreeMeetingRoomComponent } from './home/free-meeting-room/free-meeting-room.component';
import { SetupScreenComponent } from './setup-screen/setup-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WrapperComponent,
    FreeComponent,
    OccupiedComponent,
    ReservedComponent,
    NewReservationComponent,
    NoConnectionComponent,
    FreeMeetingRoomComponent,
    SetupScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
