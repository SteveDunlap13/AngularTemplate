
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { routerStateConfig } from './router.module';
import { MergedRouteReducerState } from './state';



const getRouterState = createFeatureSelector<MergedRouteReducerState>(routerStateConfig.stateKey);

export const getMergedRoute = createSelector(getRouterState, (routerReducerState) => {

    if (routerReducerState !== undefined) {
        return routerReducerState.state;
    }

    return undefined;
});


// REMARK: Example router selector to perform logic on a certain route
export const showMarvelStudiosLink = createSelector(getMergedRoute, (state) => {

    if (state?.url && state?.url.startsWith('/marvel-studios')) {
        return true;
    }
    return false;
});
