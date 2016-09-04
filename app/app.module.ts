/* Angular */

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule }   from '@angular/router';
import { routing, appRoutingProviders } from './app.routing';

/* Global */
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component'

/* Pages */ 
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: 
  [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }