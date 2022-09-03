import * as AgoraTypeInterfaces from "./AgoraTypeInterfaces";

class AgoraConfig implements AgoraTypeInterfaces.AgoraConfigInterface {

	appId: any;
	primaryCertificate?: any;
	channels?: any;
	tokens?: any;
	imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface;

	constructor(
		_appId: any,
		_primaryCertificate?: any,
		_channels?: any,
		_tokens?: any,
		_imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface
	) {
		this.appId = _appId;
		this.primaryCertificate = _primaryCertificate;
		this.channels = _channels;
		this.tokens = _tokens;
		this.imCallConfig = _imCallConfig;
	}

}

export {AgoraConfig}
