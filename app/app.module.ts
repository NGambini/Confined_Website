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
import { NewsComponent } from './news/news.component';
import { ConceptComponent } from './concept/concept.component';
import { MediaComponent } from './media/media.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: 
  [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    NewsComponent,
    ConceptComponent,
    MediaComponent,
    TeamComponent,
    ContactComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }