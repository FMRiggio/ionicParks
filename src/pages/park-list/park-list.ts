import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ParkDataProvider } from '../../providers/park-data/park-data';
import { ParkDetailsPage } from '../park-details/park-details';

@Component({
	selector: 'page-park-list',
	templateUrl: 'park-list.html'
})
export class ParkListPage {

	public parks: Array<Object> = [];
	public searchQuery: string = '';

	public constructor(
		public navCtrl: NavController, 
		public loadingCtrl: LoadingController,
		public parkData: ParkDataProvider
	) {

	}

	public ionViewDidLoad() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();

		this.parkData.getParks().then( result => {
			this.parks = result;

			loading.dismiss();
		});
	}

	public goParkDetails( parkData ) {
		this.navCtrl.push( ParkDetailsPage, { parkData: parkData });
	}
	
	public getParks(event) {

		// Resetta la lista all'originale
		this.parkData.getParks().then( result => {
			this.parks = result;
		});

		// la ricerca prende il valore dalla search bar
		let queryString = event.target.value;
		if ( queryString !== undefined ) {
			// se il valore è vuoto, non fare la ricerca
			if ( queryString.trim() == '' ) {
				return;
			}
			this.parkData.getFilteredParks(queryString).then( result => {
				this.parks = result;
			});
		}
	}

	public resetList(event) {
		// Resetta la lista all'originale
		this.parkData.getParks().then( result => {
			this.parks = result;
		});
	}

	public customHeaderFn(record, recordIndex, records) {
		if ( recordIndex > 0 ) {
			if ( record.name.charAt(0) !== records[recordIndex - 1].name.charAt(0) ) {
				return record.name.charAt(0);
			} else {
				return null;
			}
		} else {
			return record.name.charAt(0);
		}
	}
}
