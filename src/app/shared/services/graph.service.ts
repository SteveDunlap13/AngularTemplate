
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AppConfigService } from './app.config.service';
import { ProfileType } from '../models';



@Injectable({ providedIn: 'root' })
export class GraphService {

    constructor(
        private http: HttpClient,
        private appConfigService: AppConfigService) { }



    public getProfile(): Observable<ProfileType> {

        return this.http.get(this.appConfigService.getSettings('app').profileUri);
    }
}

