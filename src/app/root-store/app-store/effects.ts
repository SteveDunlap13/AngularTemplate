
import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';

import { UntilDestroy } from '@ngneat/until-destroy';



@UntilDestroy({ checkProperties: true })
@Injectable()
export class AppStoreEffects {

    constructor(private actions: Actions) { }

}
