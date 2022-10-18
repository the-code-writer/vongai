import * as FirebaseTypeInterfaces from "./FirebaseTypeInterfaces";

class FirebaseConfig implements FirebaseTypeInterfaces.FirebaseConfigInterface {

	apiKey: any;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;

	constructor(
		_apiKey: any,
		_authDomain: string,
		_projectId: string,
		_storageBucket: string,
		_messagingSenderId: string,
		_appId: string,
		_measurementId: string,
	) {
		this.apiKey = _apiKey;
		this.authDomain = _authDomain;
		this.projectId = _projectId;
		this.storageBucket = _storageBucket;
		this.messagingSenderId = _messagingSenderId;
		this.appId = _appId;
		this.measurementId = _measurementId;
	}

}

export {FirebaseConfig}
