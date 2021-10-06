
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, ofType } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import * as featureActions from './actions';



@Injectable()
export class RouterStoreEffects {

    constructor(
        private router: Router,
        private location: Location,
        private actions: Actions) { }



    public navigate$ = this.actions.pipe(
        ofType(featureActions.GO),
        map((action: any) => action.payload),
        tap(({ path, query: queryParams, extras }) => void this.router.navigate(path, { queryParams, ...extras })
        )
    );
}
