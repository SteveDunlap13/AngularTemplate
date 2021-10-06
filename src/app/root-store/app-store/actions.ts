
import { createAction, props } from '@ngrx/store';



export const openSideNavRequest = createAction(
    '[App] Open Side Nav Request',
    props<{ payload: { open: boolean, filterType: number } }>()
);

export const closeSideNavRequest = createAction(
    '[App] Close Side Nav Request',
    props<{ payload: { close: boolean, filterType: number } }>()
);
