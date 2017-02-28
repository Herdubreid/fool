import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MyApp } from './app.component';
import { StorageService } from '../data/service';
import { play, initialState } from '../data/state';
import { HomePage } from '../pages/home/home';
import { PlayPage } from '../pages/play/play';
import { ScorePage } from '../pages/score/score';
import { AboutPage } from '../pages/about/about';
import { PointsComponent } from '../components/points/points';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlayPage,
    ScorePage,
    AboutPage,
    PointsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(play, initialState),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlayPage,
    ScorePage,
    AboutPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage,
    StorageService
  ]
})
export class AppModule { }
