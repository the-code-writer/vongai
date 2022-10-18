import { K, ModuleBaseClasses } from "../app/helpers";
import * as FirebaseTypeInterfaces from "./lib/FirebaseTypeInterfaces";
import { FirebaseConfig } from './lib/FirebaseConfig';
import { f7 } from "framework7-react";

type FirebaseOptions = {
	config: FirebaseConfig
} & ModuleBaseClasses.DovellousModuleOptions;

class FirebaseLibrary extends ModuleBaseClasses.DovellousModule {
	
	manaLevel: number
	declare options: FirebaseOptions; // <-- declare
	declare modules: any;
	declare events:  any;

	constructor(
		events: any,
		apiKey: any,
		authDomain?: string,
		projectId?: string,
		storageBucket?: string,
		messagingSenderId?: string,
		appId?: string,
		measurementId?: string,
	) {

		super();

		let self = this;
		
		self.events = events;

		if(!apiKey || apiKey === null || apiKey === undefined || typeof apiKey === "undefined"){

			const appConfig: any = f7.params.dovellous;

			if(appConfig.hasOwnProperty('firebase')){

			}
    
			self.options.config = appConfig.firebase;		

		}else{

			if (apiKey instanceof FirebaseConfig) {

				self.options.config = appId;

			} else {

				self.options.config = new FirebaseConfig(
					apiKey,
					authDomain,
					projectId,
					storageBucket,
					messagingSenderId,
					appId,
					measurementId,
				);

			}

		}

		self.modules = (function () {

			const parent = {

				isLoaded: false,

				events: {},

				firebaseLibrary: {},

				firebaseConfig: {},

				firebaseOptions: {},

				initModules: async (
					firebaseLibrary: any
				) => {

					parent.firebaseLibrary = firebaseLibrary;

					parent.events = firebaseLibrary.events;

					parent.firebaseOptions = firebaseLibrary.options;

					parent.firebaseConfig = firebaseLibrary.options.config;

					await parent.realtimeDatabase.init();

					f7.emit(
						K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_LOADED,
						{
							app: parent
						}
					);

					parent.isLoaded = true;

				},

				realtimeDatabase: {

					isReady: false,

					lib: {},

					init: async () => {

						parent.realtimeDatabase.lib = new RealtimeDatabase(parent);

						parent.realtimeDatabase.isReady = true;

						f7.emit(
							K.Events.Modules.Firebase.RealtimeDatabase.ON_APP_INIT,
							{
								firebaseApp:  parent,
								realtimeDatabaseApp: parent.realtimeDatabase,
							}
						);

						return parent.realtimeDatabase;

					},

				},

			};

			return parent;

		})();

		self.modules.initModules(self);

	}

}

// Firebase Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Firebase);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const FirebaseLibEvent: ModuleBaseClasses.DovellousLibraryEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Firebase.FirebaseLibEvent.NAME);

const Firebase = (Framework7:any ) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new FirebaseLibrary(FirebaseLibEvent);

};

export { Firebase, FirebaseConfig, FirebaseLibEvent };