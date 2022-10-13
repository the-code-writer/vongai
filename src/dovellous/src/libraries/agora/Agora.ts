import { K, ModuleBaseClasses } from "../app/helpers";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng" 
import * as AgoraTypeInterfaces from "./lib/AgoraTypeInterfaces";
import { AgoraConfig } from './lib/AgoraConfig';
import { IMCallConfig, IMCall } from "./apps/voice/IMCall";

type AgoraOptions = {
	config: AgoraConfig
} & ModuleBaseClasses.DovellousModuleOptions;

class AgoraLibrary extends ModuleBaseClasses.DovellousModule {
	
	manaLevel: number
	declare options: AgoraOptions; // <-- declare
	declare modules: any;
	declare events:  any;

	constructor(
		f7: any,
		events: any,
		appId?: any | AgoraTypeInterfaces.AgoraConfigInterface,
		primaryCertificate?: any,
		imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface
	) {

		super();

		let self = this;
		
		self.events = events;

		if(!appId || appId === null || typeof appId === "undefined"){

			const appConfig: any = f7.params.dovellous;

			if(appConfig.hasOwnProperty('agora')){

			}
    
			self.options.config = appConfig.agora;		

		}else{

			if (appId instanceof AgoraConfig) {

				self.options.config = appId;

			} else {

				self.options.config = new AgoraConfig(
					appId, 
					primaryCertificate,
					imCallConfig
				);

			}

		}

		self.modules = (function () {

			const parent = {

				isLoaded: false,

				events: {},

				agoraLibrary: {},

				agoraConfig: {},

				agoraOptions: {},

				initModules: async (
					agoraLibrary: any
				) => {

					parent.agoraLibrary = agoraLibrary;

					parent.events = agoraLibrary.events;

					parent.agoraOptions = agoraLibrary.options;

					parent.agoraConfig = agoraLibrary.options.config;

					await parent.imCall.init(f7);

					f7.emit(
						K.Events.Modules.Agora.App.ON_APP_INIT,
						{
							app: parent,
							f7: f7
						}
					);

					parent.isLoaded = true;

				},

				imCall: {

					isReady: false,

					lib: {},

					init: async (f7: any) => {

						parent.imCall.lib = new IMCall(f7, parent);

						parent.imCall.isReady = true;

						f7.emit(
							K.Events.Modules.Agora.IMCall.ON_APP_INIT,
							{
								agoraApp:  parent,
								imCallApp: parent.imCall,
							}
						);

						return parent.imCall;

					},

				},

			};

			return parent;

		})();

		self.modules.initModules(self);

	}

	getDevices(eventCallBackFunction: any){
		
        // Get all audio and video devices.
		AgoraRTC.getDevices().then(devices => {
			const audioDevices = devices.filter(function(device){
				return device.kind === "audioinput";
			});
			const videoDevices = devices.filter(function(device){
				return device.kind === "videoinput";
			});
			eventCallBackFunction(audioDevices, videoDevices);
		});
	}

}

// Agora Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Agora);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const AgoraLibEvent: ModuleBaseClasses.DovellousLibraryEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Agora.AgoraLibEvent.NAME);

const Agora = (Framework7:any ) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new AgoraLibrary(Framework7, AgoraLibEvent);

};

export { Agora, AgoraConfig, AgoraLibEvent };