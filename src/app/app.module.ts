import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WrapperComponent } from './home/wrapper/wrapper.component';
import { FreeComponent } from './home/free/free.component';
import { OccupiedComponent } from './home/occupied/occupied.component';
import { ReservedComponent } from './home/reserved/reserved.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WrapperComponent,
    FreeComponent,
    OccupiedComponent,
    ReservedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
