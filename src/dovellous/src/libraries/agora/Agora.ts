import { K, ModuleBaseClasses } from "../app/helpers";

import * as AgoraTypeInterfaces from "./lib/AgoraTypeInterfaces";

import { VoiceCallConfig, VoiceCall } from "./apps/voice/VoiceCall";

class AgoraConfig implements AgoraTypeInterfaces.AgoraConfigInterface {
	appId: any;
	primaryCertificate: any;
	channels: any;
	tokens: any;
	voiceCallConfig: VoiceCallConfig;
	static events: any;

	constructor(
		appId: any,
		primaryCertificate: any,
		channels: any,
		tokens: any,
		voiceCallConfig: VoiceCallConfig
	) {
		this.appId = appId;
		this.primaryCertificate = primaryCertificate;
		this.channels = channels;
		this.tokens = tokens;
		this.voiceCallConfig = voiceCallConfig;
	}

}


type AgoraOptions = {
	agoraConfig: AgoraConfig
} & ModuleBaseClasses.DovellousModuleOptions

class AgoraLibrary extends ModuleBaseClasses.DovellousModule {
	
	manaLevel: number
	declare options: AgoraOptions; // <-- declare
	declare modules: any;
	declare events:  any;

	constructor(
		events: any,
		Framework7App: any,
		appId?: any,
		primaryCertificate?: any,
		channels?: any,
		tokens?: any,
		voiceCallConfig?: VoiceCallConfig | AgoraConfig
	) {

		super();

		let self = this;
		
		self.events = events;

		if (voiceCallConfig instanceof AgoraConfig) {

			self.options.agoraConfig = voiceCallConfig;

		} else {

			self.options.agoraConfig = new AgoraConfig(appId, primaryCertificate, channels, tokens, voiceCallConfig);

		}

		self.modules = self.init(events, Framework7App, self.options.agoraConfig);

		self.modules.initModules(self, Framework7App, self.options.agoraConfig);

	}

	init(dovellousEvents: any | null, Framework7App: any | null, agoraConfig: VoiceCallConfig | AgoraConfig | null) {

		this.modules = (function () {

			let parent = {

				isLoaded: false,

				DovellousEvents: {},

				agoraConfig: {},

				Framework7App: {
					dovellousEventsEmit: (eventName: string, eventDetails: any)=>{},
					dovellousEventsOn: (eventName: string, eventDetails: any)=>{},
				},

				RTC_ENGINE: {},
				APP_ID: "",
				PRIMARY_CERTIFICATE: "",
				CHANNELS: {},
				DEFAULT_CHANNEL: "",
				TOKENS: {},
				DEFAULT_TOKEN: "",

				initModules: async (
					app: any,
					Framework7App: any,
					agoraConfig: {
						appId: string;
						primaryCertificate: string;
						agora: {
							channels: {};
						};
						channels: { [x: string]: string; };
						tokens: { [x: string]: string; };
						voiceCallConfig: { moduleName: string; };
					}
				) => {

					parent.Framework7App = Framework7App;

					parent.APP_ID = agoraConfig.appId;
					parent.PRIMARY_CERTIFICATE = agoraConfig.primaryCertificate;
					parent.CHANNELS = agoraConfig.channels;
					parent.DEFAULT_CHANNEL = import.meta.env.VNG_AGORA_DEFAULT_CHANNEL;
					parent.TOKENS = agoraConfig.tokens;
					parent.DEFAULT_TOKEN = import.meta.env.VNG_AGORA_DEFAULT_TOKEN;

					await parent.generateDefaultToken();

					await parent.generateDefaultChannel();

					await parent.voiceCall.init(app, agoraConfig.voiceCallConfig);

					parent.Framework7App.dovellousEventsEmit(
						K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED,
						{
							agoraApp: app,
							agoraModules: parent
						}
					);

					parent.isLoaded = true;

				},

				generateDefaultToken: async () => {

					let _token: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_TOKEN;

					//call ajax and retrieve token

					parent.DEFAULT_TOKEN = _token;

				},

				generateDefaultChannel: async () => {

					let _channel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_CHANNEL;

					//call ajax and retrieve channel

					parent.DEFAULT_CHANNEL = _channel;

				},

				voiceCall: {

					isReady: false,

					lib: {},

					voiceCallConfig: {
						moduleName: "VoiceCall",
					},

					init: async (app: any, voiceCallConfig: { moduleName: string; }) => {

						parent.voiceCall.voiceCallConfig = voiceCallConfig;

						parent.voiceCall.lib = new VoiceCall(
							parent.DovellousEvents, 
							parent.Framework7App, 
							voiceCallConfig
						);

						parent.Framework7App.dovellousEventsEmit(
							K.Events.Modules.Agora.VoiceCall.ON_APP_INIT,
							{
								agoraApp: app,
								voiceCallApp: parent.voiceCall,
							}
						);

						parent.voiceCall.isReady = true;

						return parent.voiceCall;

					},

				},

			};

			return parent;

		})();

		return this.modules;

	}

}

// Agora Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Agora);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const AgoraLibEvent: ModuleBaseClasses.DovellousLibraryEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Agora.AgoraLibEvent.NAME);

const Agora = (Framework7App: any, AgoraConfigOptions: AgoraConfig) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new AgoraLibrary(AgoraLibEvent, Framework7App, AgoraConfigOptions);

};

export { Agora, AgoraConfig, AgoraLibEvent };