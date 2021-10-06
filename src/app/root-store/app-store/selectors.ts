
import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State } from './state';



const toggleSideNavState = (state: State): any => state.toggleSideNav;



export const selectAppState = createFeatureSelector<State>('app');



export const selectToggleState = createSelector(selectAppState, toggleSideNavState);
