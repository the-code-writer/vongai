import { K, ModuleBaseClasses } from "../app/helpers";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng" 
import * as AgoraTypeInterfaces from "./lib/AgoraTypeInterfaces";
import { AgoraConfig } from './lib/AgoraConfig';
import { IMCallConfig, IMCall } from "./apps/voice/IMCall";
import { f7 } from "framework7-react";

type AgoraOptions = {
	config: AgoraConfig
} & ModuleBaseClasses.DovellousModuleOptions;

class AgoraLibrary extends ModuleBaseClasses.DovellousModule {
	
	manaLevel: number
	declare options: AgoraOptions; // <-- declare
	declare modules: any;
	declare events:  any;

	constructor(
		events: any,
		appId?: any | AgoraTypeInterfaces.AgoraConfigInterface,
		primaryCertificate?: any,
		channels?: any,
		tokens?: any,
		imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface
	) {

		super();

		let self = this;
		
		self.events = events;

		if (appId instanceof AgoraConfig) {

			self.options.config = appId;

		} else {

			self.options.config = new AgoraConfig(
				appId, 
				primaryCertificate, 
				channels, 
				tokens, 
				imCallConfig
			);

		}

		self.modules = (function () {

			const parent = {

				isLoaded: false,

				events: {},

				agoraLibrary: {},

				agoraRTC: <AgoraTypeInterfaces.RTCInterface>{},

				agoraClient: <IAgoraRTCClient>{},

				agoraConfig: {},

				agoraOptions: {},

				initModules: async (
					agoraLibrary: any
				) => {

					parent.agoraLibrary = agoraLibrary;

					parent.events = agoraLibrary.events;

					parent.agoraOptions = agoraLibrary.options;

					parent.agoraConfig = agoraLibrary.options.config;

					parent.agoraClient = AgoraRTC.createClient(
						{ 
							mode: "rtc", 
							codec: "vp8" 
						}
					);

					parent.agoraRTC = {
						// For the local client.
						client: null,
						// For the local audio and video tracks.
						localAudioTrack: null,
						localVideoTrack: null,
					};

					await parent.imCall.init();

					f7.emit(
						K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED,
						{
							app: parent
						}
					);

					parent.isLoaded = true;

				},

				imCall: {

					isReady: false,

					lib: {},

					init: async () => {

						parent.imCall.lib = new IMCall(parent);

						f7.emit(
							K.Events.Modules.Agora.IMCall.ON_APP_INIT,
							{
								agoraApp:  parent,
								imCallApp: parent.imCall,
							}
						);

						parent.imCall.isReady = true;

						return parent.imCall;

					},

				},

			};

			return parent;

		})();

		self.modules.initModules(self);

	}

	getDevices(eventCallBackFunction){
		
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

const Agora = (AgoraConfigOptions: AgoraConfig) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new AgoraLibrary(AgoraLibEvent, AgoraConfigOptions);

};

export { Agora, AgoraConfig, AgoraLibEvent };