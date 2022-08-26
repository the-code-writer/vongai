import Framework7 from 'framework7/lite-bundle';

import { K, ModuleBaseClasses } from "../app/helpers";

import { VoiceCallConfig, VoiceCall } from "./apps/voice/VoiceCall";

interface AgoraInterface {
	voiceCall: VoiceCallConfig,
}

class AgoraConfig implements AgoraInterface {
	appId: any;
	primaryCertificate: any;
	channels: any;
	tokens: any;
	voiceCall: VoiceCallConfig;
	static events: any;

	constructor(
		appId: any,
		primaryCertificate: any,
		channels: any,
		tokens: any,
		voiceCall: VoiceCallConfig
	) {
		this.appId = appId;
		this.primaryCertificate = primaryCertificate;
		this.channels = channels;
		this.tokens = tokens;
		this.voiceCall = voiceCall;
	}

}


type AgoraOptions = {
	hat: string
} & ModuleBaseClasses.DovellousModuleOptions

class AgoraLibrary extends ModuleBaseClasses.DovellousModule {
	
	manaLevel: number
	declare options: AgoraOptions; // <-- declare
	declare modules: any;
	declare events;
	constructor(
		events: any,
		F7: Framework7,
		appId: any,
		primaryCertificate: any,
		channels: any,
		tokens: any,
		voiceCall: VoiceCallConfig | AgoraConfig
	) {
		super()
		this.manaLevel = 100
		this.options.hat = "pointy" // <-- no problem now

		let self = this;

		this.events = events;

		this.modules.params = this.options;

		let options: AgoraConfig;

		if (voiceCall instanceof AgoraConfig) {

			options = voiceCall;

		} else {

			options = new AgoraConfig(appId, primaryCertificate, channels, tokens, voiceCall);

		}

		this.modules.initModules(this, F7, options);

	}

	init() {

		this.modules = (function () {

			let parent = {

				isLoaded: false,

				params: AgoraConfig,

				F7: "",

				RTC_ENGINE: {},
				APP_ID: "",
				PRIMARY_CERTIFICATE: "",
				CHANNELS: {},
				DEFAULT_CHANNEL: "",
				TOKENS: {},
				DEFAULT_TOKEN: "",

				initModules: async (
					app: any,
					F7: Framework7,
					options: {
						appId: string;
						primaryCertificate: string;
						agora: {
							channels: {};
						};
						channels: { [x: string]: string; };
						tokens: { [x: string]: string; };
						voiceCall: { moduleName: string; };
					}
				) => {

					parent.F7 = F7;

					parent.RTC_ENGINE = 'RtcEngine';

					parent.APP_ID = options.appId;
					parent.PRIMARY_CERTIFICATE = options.primaryCertificate;
					parent.CHANNELS = options.agora.channels;
					parent.DEFAULT_CHANNEL = options.channels["default"];
					parent.TOKENS = options.tokens;
					parent.DEFAULT_TOKEN = options.tokens["default"];

					await parent.generateDefaultToken();

					await parent.generateDefaultChannel();

					await parent.voiceCall.init(app, options.voiceCall);

					parent.params.events[K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED](
						{
							agoraApp: app,
							agoraModule: parent
						}
					);

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

					params: {
						moduleName: "VoiceCall",
					},

					init: async (app: any, options: { moduleName: string; }) => {

						parent.voiceCall.params = options;

						parent.voiceCall.lib = new VoiceCall(
							parent.params.events, 
							parent.F7, 
							options);

						parent.voiceCall.isReady = true;

						parent.params.events[K.Events.Modules.Agora.VoiceCall.ON_APP_INIT]([
							app,
							options
						]);

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

const Agora = (F7: Framework7, AgoraConfigOptions: AgoraConfig) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new AgoraLibrary(AgoraLibEvent, F7, AgoraConfigOptions);

};

export { Agora, AgoraConfig, AgoraLibEvent };