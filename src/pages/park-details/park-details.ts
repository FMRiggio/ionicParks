import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'page-park-details',
	templateUrl: 'park-details.html',
})
export class ParkDetailsPage {

	public parkInfo: Object;

	public constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {
		this.parkInfo = this.navParams.data.parkData;
	}

}
