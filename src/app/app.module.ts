import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiDataService } from './api-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponentComponent } from './weather-component/weather-component.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
