/* Angular */

import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {HttpModule, Http} from "@angular/http";
import { routing, appRoutingProviders } from "./app.routing";
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from "ng2-translate/ng2-translate";

/* Global */
import { AppComponent } from "./app.component";
import { MainMenuComponent } from "./main-menu/main-menu.component";

/* Pages */
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { ConceptComponent } from "./concept/concept.component";
import { MediaComponent } from "./media/media.component";
import { TeamComponent } from "./team/team.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    NewsComponent,
    ConceptComponent,
    MediaComponent,
    TeamComponent
  ],
  imports:
  [
    HttpModule,
    BrowserModule,
    TranslateModule.forRoot({
          deps: [Http],
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, "app/i18n", ".json")
        }),
    routing
  ],
  providers: [
    appRoutingProviders
  ]
})



export class AppModule { }
