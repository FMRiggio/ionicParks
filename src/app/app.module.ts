import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ParkDetailsPage } from '../pages/park-details/park-details';
import { ParkListPage } from '../pages/park-list/park-list';
import { ParkMapPage } from '../pages/park-map/park-map';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ParkDataProvider } from '../providers/park-data/park-data';

@NgModule({
	declarations: [
		MyApp,
		TabsPage,
		ParkListPage,
		ParkMapPage,
		ParkDetailsPage
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		TabsPage,
		ParkListPage,
		ParkMapPage,
		ParkDetailsPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
    	ParkDataProvider
	]
})
export class AppModule {}
