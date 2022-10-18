import * as AgoraTypeInterfaces from "./AgoraTypeInterfaces";

class AgoraConfig implements AgoraTypeInterfaces.AgoraConfigInterface {

	appId: any;
	primaryCertificate?: any;
	clientCodec?: string;
	clientMode?: string;
	imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface;

	constructor(
		_appId: any,
		_primaryCertificate?: any,
		_clientCodec?: string,
		_clientMode?: string,
		_imCallConfig?: AgoraTypeInterfaces.IMCallConfigInterface
	) {
		this.appId = _appId;
		this.primaryCertificate = _primaryCertificate;
		this.clientCodec  = _clientCodec;
		this.clientMode   = _clientMode;
		this.imCallConfig = _imCallConfig;
	}

}

export {AgoraConfig}
