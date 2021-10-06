
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { AppMaterialModule } from './material.module';

import {
    HeaderComponent
} from './components';



@NgModule({

    imports: [

        CommonModule,

        AppMaterialModule,

        MatMomentDateModule,

        ReactiveFormsModule,

        RouterModule
    ],

    declarations: [

        HeaderComponent
    ],

    providers: [

        DatePipe,
        TitleCasePipe,

        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ],

    entryComponents: [],

    exports: [

        CommonModule,

        ReactiveFormsModule,

        AppMaterialModule,

        HeaderComponent
    ]
})
export class SharedModule { }
