import * as AgoraTypeInterfaces from "./AgoraTypeInterfaces";

import { IMCallConfig } from "../apps/voice/IMCall";

class AgoraConfig implements AgoraTypeInterfaces.AgoraConfigInterface {
	appId: any;
	primaryCertificate: any;
	channels: any;
	tokens: any;
	imCallConfig: IMCallConfig;
	static events: any;

	constructor(
		appId: any,
		primaryCertificate: any,
		channels: any,
		tokens: any,
		imCallConfig: IMCallConfig
	) {
		this.appId = appId;
		this.primaryCertificate = primaryCertificate;
		this.channels = channels;
		this.tokens = tokens;
		this.imCallConfig = imCallConfig;
	}

}

export {AgoraConfig}
