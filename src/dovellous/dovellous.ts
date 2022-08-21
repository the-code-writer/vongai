// Import Framework7
// @ts-ignore

import 'dotenv/config'

import Framework7 from 'framework7/lite-bundle';
import {K, Snippets} from './src/libraries/app/helpers';

import {CapacitorStorage} from './src/libraries/storage/capacitor-js-storage/CapacitorStorage';
import {JSONDatabaseService} from './src/libraries/storage/json-db-service/JSONDatabaseService';
import {Config as JSONDatabaseServiceConfig} from './src/libraries/storage/json-db-service/lib/JSONDatabaseServiceConfig';

/* Begin Import Agora Library */
import { VoiceCallConfig } from './src/libraries/agora/apps/voice/VoiceCallConfig';
import { InstantMessagingConfig } from './src/libraries/agora/apps/instant-messaging/InstantMessagingConfig';
import { VideoCallConfig } from './src/libraries/agora/apps/video/VideoCallConfig';
import { LiveStreamingConfig } from './src/libraries/agora/apps/live-streaming/LiveStreamingConfig';
import { WhiteBoardConfig } from './src/libraries/agora/apps/white-board/WhiteBoardConfig';
import {Agora, AgoraConfig} from './src/libraries/agora/Agora';
/* End Import Agora Library */

import SqliteService from './src/libraries/databases/sqlite-service';
import Blockchain from './src/libraries/cryptography/blockchain';
import Encryption from './src/libraries/cryptography/encryption';
import DeviceData from './src/libraries/device/device-data';
import MimeTypes from './src/libraries/media/mime-types';
import Base64 from './src/libraries/encodings/base64';
import AppThemes from './src/libraries/app/themes';
import AppImages from './src/libraries/app/images';

import {GoogleFirebase} from './src/libraries/firebase/GoogleFirebase';
import {Vaida} from './src/libraries/vaida/Vaida';

import WalframAlpha from './src/libraries/wolfram-alpha';
import FileSystem from './src/libraries/filesystem';
import NetworkRequest from './src/libraries/services/requests';

interface DF7Modules {
    modules: any;
  }
  
class DF7Config implements DF7Modules {
    modules: any;
    constructor(
        _modules = {
            agora: {
                voiceCall: <VoiceCallConfig> {},
                videoCall: <VideoCallConfig> {},
                instantMessaging: <InstantMessagingConfig> {},
                liveStreaming: <LiveStreamingConfig> {},
                whiteBoard: <WhiteBoardConfig> {},
            }, 
        }) {
      this.modules = _modules;
    }
}

class Dovellous{

  Libraries = {

    Agora: null

  }

  constructor(F7: any, agoraConfig: AgoraConfig){

    const self = this;

    /* Begin Agora Library Init */

    F7.on(K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED, (agoraInstance: any) => {

      self.Libraries.Agora = agoraInstance;
    
      F7.emit(K.Events.Modules.Agora.AgoraLibEvent.MODULE_READY, agoraInstance);
    
    });

    agoraConfig instanceof AgoraConfig ? this.initAgora(F7, agoraConfig) : null;

    /* End Agora Library Init */

  }

  /**
	 * Initializes the Agora Library:
   * May require these params appId, primaryCertificate, channels, tokens, voiceCall, videoCall, instantMessaging, liveStreaming, whiteBoard
	 * param agoraConfig AgoraConfig - A config file for all agora modules. This follows the correct Agora Config Interface
	 * return null
	 */
  initAgora (F7: any, agoraConfig: AgoraConfig) {

    Agora(F7, agoraConfig);

  }

}

export {Dovellous, K, Snippets};