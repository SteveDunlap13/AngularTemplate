
import { Component, OnInit } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';

import { AppConfigService } from './shared/services/app.config.service';



@UntilDestroy({ checkProperties: true })
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public year = new Date();
    public appVersion$?: Observable<string>;



    constructor(private appConfigService: AppConfigService) { }



    ngOnInit(): void {

        this.appConfigService.init().pipe(untilDestroyed(this)).subscribe();

        this.appVersion$ = this.appConfigService.getSettings$('version').pipe(map(version => `${version.number}${version.build}`));
    }
}
