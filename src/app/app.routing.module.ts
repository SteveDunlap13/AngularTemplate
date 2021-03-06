
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) }

];



@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: false
    })],

    exports: [RouterModule]
})
export class AppRoutingModule { }