
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { RootStoreState } from '@app/root-store';
import { AppComponent } from './app.component';
import { MOCK_INITIAL_STATE } from './shared/mocks';



/** This should only be called once */
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());



@Component({
    selector: 'app-header',
    template: ``
})
class MockHeaderComponent { }



describe('AppComponent', () => {

    let store: MockStore<RootStoreState.State>;



    beforeEach(waitForAsync(() => {

        void TestBed.configureTestingModule({

            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],

            declarations: [
                MockHeaderComponent,
                AppComponent
            ],
            providers: [
                provideMockStore({
                    initialState: MOCK_INITIAL_STATE
                })
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        store = TestBed.inject(MockStore);
    });

    beforeEach(inject([Store], (testStore: MockStore<RootStoreState.State>) => {
        store.setState(MOCK_INITIAL_STATE);
    }));

    afterEach(inject([Store], (testStore: MockStore<RootStoreState.State>) => {
        store.setState(MOCK_INITIAL_STATE);
    }));



    it('should create the app', () => {

        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
