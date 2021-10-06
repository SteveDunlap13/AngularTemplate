
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';



import { SharedModule } from '@app/shared/shared.module';
import { RootStoreModule } from '@app/root-store';
import { AppRoutingModule } from '@app/app.routing.module';

import { AppComponent } from '@app/app.component';



@NgModule({

    declarations: [

        AppComponent
    ],

    imports: [

        BrowserModule,
        BrowserAnimationsModule,

        HttpClientModule,

        SharedModule,

        RootStoreModule,

        AppRoutingModule
    ],

    providers: [],

    bootstrap: [AppComponent]
})
export class AppModule { }
