import { K, ModuleBaseClasses } from "../app/helpers";
import AgoraRTC from "agora-rtc-sdk-ng" 
import * as AgoraTypeInterfaces from "./lib/AgoraTypeInterfaces";
import { AgoraConfig } from './lib/AgoraConfig';
import { IMCall } from "./apps/voice/IMCall";

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
		clientCodec?: string,
		clientMode?: string,
		imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface
	) {

		super();

		let self = this;
		
		self.events = events;

		if(f7.params.dovellous.hasOwnProperty('agora')){ 

			if (appId instanceof AgoraConfig) {

				self.options.config = appId;

			}else if(typeof appId === "string"){

				self.options.config = new AgoraConfig(
					appId,
					primaryCertificate,
					clientCodec,
					clientMode,
					imCallConfig,
				  );

			} else {

				self.options.config = new AgoraConfig(
					f7.params.dovellous.agora.appId,
					f7.params.dovellous.agora.primaryCertificate,
					f7.params.dovellous.agora.clientCodec,
					f7.params.dovellous.agora.clientMode,
					f7.params.dovellous.agora.imCallConfig,
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
						K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED,
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

}

// Agora Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Agora);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const AgoraLibEvent: ModuleBaseClasses.DovellousLibraryEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Agora.AgoraLibEvent.NAME);

const Agora = (Framework7:any, agoraConfig:AgoraTypeInterfaces.AgoraConfigInterface ) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new AgoraLibrary(Framework7, AgoraLibEvent, agoraConfig);

};

export { Agora, AgoraConfig, AgoraLibEvent };