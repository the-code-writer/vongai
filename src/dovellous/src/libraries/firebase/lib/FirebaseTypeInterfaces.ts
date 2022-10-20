
interface RealtimeDatabaseConfigInterface {

}

interface RealtimeDatabaseErrorInterface {
	composeError: Function;
	throwError: Function;
	status: number;
	message: string;
	messageDescription: string;
	error: Error
}

interface AuthConfigInterface {

}

interface AuthErrorInterface {
	composeError: Function;
	throwError: Function;
	status: number;
	message: string;
	messageDescription: string;
	error: Error
}

interface UserDataInterface {
	email: any,
	emailVerified: boolean,
	password?: any,
	displayName: any,
	disabled?: boolean,
	phoneNumber?: any,
	photoURL?: any
	uid?: string;
	providerId?: any;
  };

interface UserEmailPasswordInterface {
	email: any,
	password: any
  };

interface FirebaseConfigInterface {
	apiKey: any;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
	realtimeDatabaseConfig: RealtimeDatabaseConfigInterface | undefined;
	authConfig: AuthConfigInterface | undefined;
}

interface FirebaseErrorInterface {
	composeError: Function;
	throwError: Function;
	status: number;
	message: string;
	messageDescription: string;
	error: Error
}

export {
	FirebaseConfigInterface,
	FirebaseErrorInterface,
	RealtimeDatabaseConfigInterface,
	RealtimeDatabaseErrorInterface,
	AuthConfigInterface,
	AuthErrorInterface,
	UserDataInterface,
	UserEmailPasswordInterface,
} 