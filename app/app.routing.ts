import { Routes, RouterModule } from "@angular/router";

/* Pages */
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { ConceptComponent } from "./concept/concept.component";
import { MediaComponent } from "./media/media.component";
import { TeamComponent } from "./team/team.component";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "concept",
        component: ConceptComponent
    },
    {
        path: "news",
        component: NewsComponent
    },
    {
        path: "media",
        component: MediaComponent
    },
    {
        path: "team",
        component: TeamComponent
    }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
