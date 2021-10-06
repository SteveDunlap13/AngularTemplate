
import { NgModule } from '@angular/core';

import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MergedRouterStateSerializer } from './serializer';

import { RouterStoreEffects } from './effects';



export const routerStateConfig = {
    stateKey: 'router',
};



@NgModule({

    imports: [

        StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
        StoreRouterConnectingModule.forRoot(routerStateConfig),

        EffectsModule.forFeature([RouterStoreEffects])
    ],

    exports: [

        StoreModule,
        StoreRouterConnectingModule
    ],

    providers: [
        {
            provide: RouterStateSerializer,
            useClass: MergedRouterStateSerializer,
        }
    ]
})
export class MergedRouterStoreModule { }
