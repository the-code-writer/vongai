
interface RealtimeDatabaseConfigInterface {

}

interface RealtimeDatabaseErrorInterface {

}

interface FirebaseConfigInterface {
	apiKey: any;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
	realtimeDatabaseConfig: RealtimeDatabaseConfigInterface | undefined;
}

interface FirebaseErrorInterface {
	composeError?: Function;
	throwError?: Function;
	status: number;
	message: string;
	messageDescription: string;
	error: Error
}

export {
	FirebaseConfigInterface,
	FirebaseErrorInterface,
	RealtimeDatabaseConfigInterface,
	RealtimeDatabaseErrorInterface
} 