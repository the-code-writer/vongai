//import { f7 } from 'framework7-react';
import { K, Snippets } from './src/libraries/app/helpers';
import { Agora, AgoraConfig } from './src/libraries/agora/Agora';

// import {CapacitorStorage} from './src/libraries/storage/capacitor-js-storage/CapacitorStorage';
// import {JSONDatabaseService} from './src/libraries/storage/json-db-service/JSONDatabaseService';
// import {Config as JSONDatabaseServiceConfig} from './src/libraries/storage/json-db-service/lib/JSONDatabaseServiceConfig';

// import SqliteService from './src/libraries/databases/sqlite-service';
// import Blockchain from './src/libraries/cryptography/blockchain';
// import Encryption from './src/libraries/cryptography/encryption';
// import DeviceData from './src/libraries/device/device-data';
// import MimeTypes from './src/libraries/media/mime-types';
// import Base64 from './src/libraries/encodings/base64';
// import AppThemes from './src/libraries/app/themes';
// import AppImages from './src/libraries/app/images';

// import {GoogleFirebase} from './src/libraries/firebase/GoogleFirebase';
// import {Vaida} from './src/libraries/vaida/Vaida';

// import WalframAlpha from './src/libraries/wolfram-alpha';
// import FileSystem from './src/libraries/filesystem';
// import NetworkRequest from './src/libraries/services/requests';

class Dovellous{

  Libraries = {

    Agora: null,

    Settings: null,

  }

  constructor(f7: any, ){
    
    const self = this;

    /* Begin Agora Library Init */

    f7.on(K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED, (agoraInstance: any) => {

      self.Libraries.Agora = agoraInstance;
    
      f7.emit(K.Events.Modules.Agora.AgoraLibEvent.MODULE_READY, agoraInstance);
    
    });

    if(f7.params.dovellous.hasOwnProperty('agora')){
      
      f7.params.dovellous.agora instanceof AgoraConfig ? this.initAgora(f7) : null;

    }

    /* End Agora Library Init */

  }

  /**
	 * Initializes the Agora Library:
   * May require these params appId, primaryCertificate, channels, tokens, imCall, videoCall, instantMessaging, liveStreaming, whiteBoard
	 * param agoraConfig AgoraConfig - A config file for all agora modules. This follows the correct Agora Config Interface
	 * return null
	 */
  initAgora (f7: any) {

    Agora(f7);

  }

}

export {Dovellous, K, Snippets};