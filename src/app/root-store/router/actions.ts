
import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';



export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';



export const Go = createAction(
    GO,
    // eslint-disable-next-line @typescript-eslint/ban-types
    props<{ payload: { path: any[], query?: object, extras?: NavigationExtras } }>()
);
