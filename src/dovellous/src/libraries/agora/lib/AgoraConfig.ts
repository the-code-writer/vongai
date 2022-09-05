import * as AgoraTypeInterfaces from "./AgoraTypeInterfaces";

class AgoraConfig implements AgoraTypeInterfaces.AgoraConfigInterface {

	appId: any;
	primaryCertificate?: any;
	channels?: any;
	defaultChannel?: any;
	imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface;

	constructor(
		_appId: any,
		_primaryCertificate?: any,
		_channels?: any,
		_defaultChannel?: any,
		_imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface
	) {
		this.appId = _appId;
		this.primaryCertificate = _primaryCertificate;
		this.channels = _channels;
		this.defaultChannel = _defaultChannel;
		this.imCallConfig = _imCallConfig;
	}

}

export {AgoraConfig}
