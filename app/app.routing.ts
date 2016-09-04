import { Routes, RouterModule } from '@angular/router';

/* Pages */ 
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }
];

export const appRoutingProviders: any[] = [
    
];

export const routing = RouterModule.forRoot(appRoutes);