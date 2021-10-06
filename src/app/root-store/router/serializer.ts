
import { RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';

import { MergedRoute } from './state';
import { Injectable } from "@angular/core";



@Injectable()
export class MergedRouterStateSerializer implements RouterStateSerializer<MergedRoute> {

    public serialize(routerState: RouterStateSnapshot): MergedRoute {

        // console.log('routerState: ', routerState);

        if (routerState === undefined) {

            return {

                url: window.location.pathname,
                params: {},
                queryParams: {},
                data: {}
            };

        } else {

            return {

                url: routerState.url,
                params: mergeRouteParams(routerState.root, r => r.params),
                queryParams: mergeRouteParams(routerState.root, r => r.queryParams),
                data: mergeRouteData(routerState.root)
            };
        }
    }
}

function mergeRouteParams(route: ActivatedRouteSnapshot, getter: (r: ActivatedRouteSnapshot) => Params): Params {

    if (!route) {
        return {};
    }

    const currentParams = getter(route);
    const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;

    if (primaryChild === null) {
        return {};
    }

    return { ...currentParams, ...mergeRouteParams(primaryChild, getter) };
}

function mergeRouteData(route: ActivatedRouteSnapshot): Data {

    if (!route) {
        return {};
    }

    const currentData = route.data;
    const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;

    if (primaryChild === null) {
        return {};
    }

    return { ...currentData, ...mergeRouteData(primaryChild) };
}
