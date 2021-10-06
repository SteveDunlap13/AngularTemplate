
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { UntilDestroy } from '@ngneat/until-destroy';

import { RootStoreState } from '@app/root-store';



@UntilDestroy({ checkProperties: true })
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    constructor(private store: Store<RootStoreState.State>) { }



    ngOnInit(): void { }

    ngOnDestroy(): void { }
}
