import { Park } from '../../models/park';

export class CustomMapMarker extends google.maps.Marker {
	public parkData: Park;

	public constructor( theParkData: Park ) {
		super();
		this.parkData = theParkData;
	}
}