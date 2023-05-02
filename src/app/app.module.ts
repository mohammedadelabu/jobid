import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateModule } from './candidate/candidate.module';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { PracticeRoutingModule } from './practice/module/practice-routing.module';
import { EditCandidateCvModule } from './recruiter/edit-candidate-cv/edit-candidate-cv.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import { AdminUserGuard } from './services/guards/admin-user.guard';
import { AuthGuard } from './services/guards/auth.guard';
import { VerificationModule } from './verification/verification.module';
// import {
//   DevToolsExtension,
//   NgRedux,
//   NgReduxModule,
// } from '@angular-redux/store';

import {
  DevToolsExtension,
  NgRedux,
  NgReduxModule,
} from '@angular-redux/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createLogger } from 'redux-logger';
import { rootReducer } from 'src/STORE/reducer';
import { IAppState, INITIAL_STATE } from 'src/STORE/store';
import { CrmItemsComponent } from './crm-items/crm-items.component';
import { AngularReduxComponent } from './practice/angular-redux/angular-redux.component';
import { DdApiSampleObjectSortingComponent } from './practice/drag-and-drop/dd-api-sample-object-sorting/dd-api-sample-object-sorting.component';
import { DdConnectedObjectSortingComponent } from './practice/drag-and-drop/dd-connected-object-sorting/dd-connected-object-sorting.component';
import { DdConnectedSortingComponent } from './practice/drag-and-drop/dd-connected-sorting/dd-connected-sorting.component';
import { DdObjectSortingComponent } from './practice/drag-and-drop/dd-object-sorting/dd-object-sorting.component';
import { DdSortingComponent } from './practice/drag-and-drop/dd-sorting/dd-sorting.component';
import { DragAndDropComponent } from './practice/drag-and-drop/drag-and-drop.component';
import { HomeComponent } from './practice/home/home.component';

// import { TokenInterceptor } from './helpers/token.interceptor';
// import { NgxStarRatingModule } from 'ngx-star-rating';
// import { SchedulerModule } from 'angular-calendar-scheduler';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { SchedulerModule } from 'angular-calendar-scheduler/modules/scheduler/scheduler.module.d';

// import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   interactionPlugin
// ]);

@NgModule({
  declarations: [
    AppComponent,
    AngularReduxComponent,
    HomeComponent,
    DragAndDropComponent,
    DdSortingComponent,
    DdConnectedSortingComponent,
    DdObjectSortingComponent,
    DdConnectedObjectSortingComponent,
    DdApiSampleObjectSortingComponent,
    CrmItemsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgMaterialModule,
    NgbModule,
    RecruiterModule,
    // SharedModule,
    BrowserAnimationsModule,
    EditorModule,
    HttpClientModule,
    EditCandidateCvModule,
    PracticeRoutingModule,
    // FullCalendarModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
    // SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
    FullCalendarModule,
    // NgxStarRatingModule
    VerificationModule,
    CandidateModule,
    NgReduxModule,
  ],
  providers: [
    AuthGuard,
    AdminUserGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
    // let enhancers = isDevMode() ? [devTools.enhancer()] : []
    let enhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];

    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [createLogger()],
      enhancers
    );
  }

  // constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
  //   let enhancers = isDevMode() ? [devTools.enhancer()] : [];
  //   ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  // }
}
