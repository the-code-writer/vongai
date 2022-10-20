import * as FirebaseTypeInterfaces from "./FirebaseTypeInterfaces";

class FirebaseConfig implements FirebaseTypeInterfaces.FirebaseConfigInterface {

	apiKey: any;
	authDomain: string | undefined;
	projectId: string | undefined;
	storageBucket: string | undefined;
	messagingSenderId: string | undefined;
	appId: string | undefined;
	measurementId: string | undefined;
	realtimeDatabaseConfig: FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface | undefined;
	authConfig: FirebaseTypeInterfaces.AuthConfigInterface | undefined;

	constructor(
		_apiKey: any,
		_authDomain?: string,
		_projectId?: string,
		_storageBucket?: string,
		_messagingSenderId?: string,
		_appId?: string,
		_measurementId?: string,
		_realtimeDatabaseConfig?: FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface,
		_authConfig?: FirebaseTypeInterfaces.AuthConfigInterface,
	) {
		this.apiKey = _apiKey;
		this.authDomain = _authDomain;
		this.projectId = _projectId;
		this.storageBucket = _storageBucket;
		this.messagingSenderId = _messagingSenderId;
		this.appId = _appId;
		this.measurementId = _measurementId;
		this.realtimeDatabaseConfig = _realtimeDatabaseConfig;
		this.authConfig = _authConfig;
	}

}

export {FirebaseConfig}
