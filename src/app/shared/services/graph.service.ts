
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, EMPTY, filter, map, Observable, of, shareReplay, switchMap } from 'rxjs';

import { AppConfigService } from '@app/shared/services/app.config.service';
import { IUser } from '@app/shared/interfaces';



@Injectable({ providedIn: 'root' })
export class GraphService {

    private readonly graphUri$ = this.appConfigService.getSettings$('app.graphUri');
    private readonly userCache = new Map<string, Observable<IUser>>();



    constructor(private http: HttpClient, private appConfigService: AppConfigService) { }



    public getUser(userId: string): Observable<IUser> {

        let cachedUser$ = this.userCache.get(userId);

        if (!cachedUser$) {

            cachedUser$ = this.graphUri$.pipe(
                switchMap(url => this.http.get<{ value: IUser[] }>(`${url}/users?$filter=startsWith(mail, '${userId}')`)),
                filter(response => !!response.value?.length),
                map(response => response.value[0]),
                catchError(() => EMPTY),
                shareReplay(1)
            );

            this.userCache.set(userId, cachedUser$);
        }

        return cachedUser$;
    }

    public getProfile(): Observable<IUser> {

        return this.graphUri$.pipe(switchMap(url => this.http.get<IUser>(`${url}/me`)));
    }
}
