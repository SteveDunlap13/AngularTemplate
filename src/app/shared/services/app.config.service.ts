
import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { BehaviorSubject, first, map, Observable, tap } from 'rxjs';

import { AppConfig, AppConfigPropertyPath, AppConfigPropertyType } from '../interfaces';



@Injectable({ providedIn: 'root' })
export class AppConfigService {

    /*
        app.config.json by default in source contains settings for local development
        This application will ALWAYS load contents from this file

        During release pipelines, file transforms are performed to copy the contents of the
        respective app.config.XXX.json files (dev, qa, prod, etc) into this one

        Anywhere in the application, where app settings are required, bind the instance of
        this service in its constructor

        e.g. constructor(private appConfigService: AppConfigService) { }
        ...
        const clientId = this.appConfigService.settings.clientId
    */


    private readonly configUrl = `./configuration/app.config.json`;

    private configSettings$ = new BehaviorSubject<AppConfig | null>(null);
    private http: HttpClient;


    constructor(private readonly httpBackend: HttpBackend) {

        /*
            HttpBackend is used to purposely ensure no Http Interceptors can interrupt
            HttpClient have all its requests route through the Http Interceptor list.
            Needed as initial processes such as MSAL will not be able to load as MSAL will attempt
            to inject its own interceptor before its initialization is complete
        */

        this.http = new HttpClient(this.httpBackend);
    }

    public init(): Observable<unknown> {
        return this.http.get<AppConfig>(this.configUrl).pipe(tap(result => this.configSettings$.next(result)));
    }

    /** Returns an observable with a configuration setting. Waits until configuration is loaded. */
    public getSettings$<T extends AppConfigPropertyPath>(key: T): Observable<AppConfigPropertyType<T>> {
        return this.configSettings$.pipe(
            first((appConfig): appConfig is AppConfig => !!appConfig),
            map(appConfig => this.getSettingsFromConfig(appConfig, key))
        );
    }

    /** Returns a configuration setting. Throws error if settings were not loaded yet. */
    public getSettings<T extends AppConfigPropertyPath>(key: T): AppConfigPropertyType<T> {
        if (!this.configSettings$.value) {
            throw new Error('App config was not loaded yet.');
        }

        return this.getSettingsFromConfig(this.configSettings$.value, key);
    }

    private getSettingsFromConfig<T extends AppConfigPropertyPath>(appConfig: AppConfig, key: T): AppConfigPropertyType<T> {
        const keys = key.split('.');

        const result = keys.reduce((account: any, current) => account && account[current], appConfig);

        return result;
    }
}
