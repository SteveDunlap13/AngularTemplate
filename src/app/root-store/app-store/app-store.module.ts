
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppStoreEffects } from './effects';
import { appReducer } from './reducer';



@NgModule({

    imports: [

        CommonModule,

        StoreModule.forFeature('app', appReducer),
        EffectsModule.forFeature([AppStoreEffects])
    ]
})
export class AppStoreModule { }
