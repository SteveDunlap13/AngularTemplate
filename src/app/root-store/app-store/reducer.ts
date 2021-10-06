
import { createReducer, on } from '@ngrx/store';

import { initialState, State } from './state';
import {
    openSideNavRequest, closeSideNavRequest
} from './actions';



export const appReducer = createReducer(

    initialState,



    on(openSideNavRequest, (state: State, { payload }) => {

        return ({
            ...state,
            toggleSideNav: payload.open,
            filterType: payload.filterType
        });
    }),

    on(closeSideNavRequest, (state: State, { payload }) => {

        return ({
            ...state,
            toggleSideNav: payload.close,
            filterType: payload.filterType
        });
    })
);
