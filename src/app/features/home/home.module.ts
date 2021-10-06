
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';



import { DashboardComponent } from './containers';

import { HomeRoutingModule } from './home.routing.module';



@NgModule({

    imports: [

        SharedModule,

        HomeRoutingModule
    ],

    declarations: [

        DashboardComponent
    ]
})
export class HomeModule { }
