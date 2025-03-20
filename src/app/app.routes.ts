import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '',
        loadChildren: () => import('./home/home.routes')
    },
    // 404 & Catch all
    {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('./error-404/error-404.routes')},
    {path: '**', redirectTo: '404-not-found'}
];
