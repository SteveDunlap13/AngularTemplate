
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MergedRouterStoreModule } from './router/router.module';

import { AppStoreModule } from './app-store';

import { reducers } from './reducers';

import { environment } from '@environments/environment';



@NgModule({

    imports: [

        CommonModule,

        MergedRouterStoreModule,

        AppStoreModule,

        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),

        EffectsModule.forRoot([]),

        environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 })
    ],

    declarations: [],

    providers: []
})
export class RootStoreModule { }
