
import { Component, OnInit } from '@angular/core';

import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { RootStoreState } from './root-store';

import { AppConfigService } from './shared/services/app.config.service';





@UntilDestroy({ checkProperties: true })
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public year = new Date();
    public appVersion = '';



    constructor(
        private store: Store<RootStoreState.State>,
        private appConfigService: AppConfigService) { }



    async ngOnInit(): Promise<void> {

        await this.appConfigService.init();
        this.appVersion = `${this.appConfigService.getSettings('version').number as string}${this.appConfigService.getSettings('version').build as string}`;
    }
}
