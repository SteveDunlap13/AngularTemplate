/* eslint-disable no-param-reassign */

import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map } from 'rxjs';



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

    private configSettings: any = null;
    private http: HttpClient;


    constructor(private readonly httpBackend: HttpBackend) {

        /*
            HttpBackend is used to purposely ensure no Http Interceptors can interrupt
            HttpClient have all its requests route through the Http Interceptor list.
            Needed as initial processes such as MSAL will not be able to load as MSAL will attempt
            to inject its own interceptor before its initialization is complete
        */

        this.http = new HttpClient(httpBackend);
    }



    public init(): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            this.http.get(this.configUrl)
                .pipe(map(result => result))
                .subscribe({

                    next: (value) => {
                        this.configSettings = value;
                        resolve(true);
                    },

                    error: (error) => reject(error)
                });
        });
    }

    public getSettings(key?: string | Array<string>): any {

        if (!key || (Array.isArray(key) && !key[0])) {
            return this.configSettings;
        }

        if (!Array.isArray(key)) {
            key = key.split('.');
        }

        const result = key.reduce((account: any, current: string) => account && account[current], this.configSettings);

        return result;
    }
}
