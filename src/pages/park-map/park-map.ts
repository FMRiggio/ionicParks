import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { ParkDataProvider } from '../../providers/park-data/park-data';
import { Park } from '../../models/park';
import { ParkDetailsPage } from '../park-details/park-details';
import { CustomMapMarker } from './custom-marker';

@Component({
	selector: 'page-park-map',
	templateUrl: 'park-map.html'
})
export class ParkMapPage {

	public map: google.maps.Map;
	public parks: Array<Park> = [];

	public constructor(
		public navCtrl: NavController,
		public platform: Platform,
		public parkData: ParkDataProvider
	) {
		this.map = null;
	}

	public ionViewDidLoad() {
		this.platform.ready().then(() => {
			this.initializeMap();
		});
	}

	public initializeMap() {
		let minZoomLevel = 3;
		//let image = 'assets/img/nps_arrowhead.png';
	
		this.map = new google.maps.Map(document.getElementById('map_canvas'), {
			zoom: minZoomLevel,
			center: new google.maps.LatLng(39.833, -98.583),
			mapTypeControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		this.parkData.getParks().then( result => {
			this.parks = result;
			for (let p of this.parks) {
				let parkPos: google.maps.LatLng = new google.maps.LatLng( p.lat, p.long);
				// let parkMarker: google.maps.Marker = new google.maps.Marker();
				let parkMarker: CustomMapMarker = new CustomMapMarker(p);
				parkMarker.setPosition(parkPos);
				parkMarker.setMap(this.map);
				//parkMarker.setIcon(image);

				google.maps.event.addListener(parkMarker, 'click', () => {
					let selectedMarker: any = parkMarker;

					this.navCtrl.push( ParkDetailsPage, {
						parkData: selectedMarker.parkData
					});
				});

			}
		});
	}

}