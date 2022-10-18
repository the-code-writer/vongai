//import { f7 } from 'framework7-react';
import { K, Snippets } from './src/libraries/app/helpers';
import { Agora, AgoraConfig } from './src/libraries/agora/Agora';
import * as AgoraTypeInterfaces from "./src/libraries/agora/lib/AgoraTypeInterfaces";
import { Firebase, FirebaseConfig } from './src/libraries/firebase/Firebase';
import * as FirebaseTypeInterfaces from "./src/libraries/firebase/lib/FirebaseTypeInterfaces";
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

  Frameworks = {

    Framework7: null

  }

  Libraries = {

    Agora: null,

    Firebase: null,

    Settings: null,

  }

  constructor(f7: any, ){

    this.Frameworks.Framework7 = f7;
    
    const self = this;

    /* Begin Agora Library Init */

    f7.on(K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED, (agoraInstance: any) => {

      console.warn("::: AgoraLibEvent MODULE_LOADED agoraInstance :::", agoraInstance);

      self.Libraries.Agora = agoraInstance;
    
      f7.emit(K.Events.Modules.Agora.AgoraLibEvent.MODULE_READY, agoraInstance);
    
    });
    
    if(f7.params.dovellous.hasOwnProperty('agora')){

      console.warn("::: f7.params.dovellous.agora instanceof AgoraConfig :::", f7.params.dovellous.agora);
    
      if(f7.params.dovellous.agora instanceof AgoraConfig){

        this.initAgora(f7.params.dovellous.agora);

      }else{

        const agoraConfig:AgoraTypeInterfaces.AgoraConfigInterface = new AgoraConfig(
          f7.params.dovellous.agora.appId,
          f7.params.dovellous.agora.primaryCertificate,
          f7.params.dovellous.agora.clientCodec,
          f7.params.dovellous.agora.clientMode,
          f7.params.dovellous.agora.imCallConfig,
        )

        this.initAgora(agoraConfig);

      }
    
    }

    /* End Agora Library Init */

    /* Begin Firebase Library Init */

    f7.on(K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_LOADED, (firebaseInstance: any) => {

      console.warn("::: FirebaseLibEvent MODULE_LOADED firebaseInstance :::", firebaseInstance);

      self.Libraries.Firebase = firebaseInstance;
    
      f7.emit(K.Events.Modules.Firebase.FirebaseLibEvent.MODULE_READY, firebaseInstance);
    
    });
    
    if(f7.params.dovellous.hasOwnProperty('firebase')){

      console.warn("::: f7.params.dovellous.firebase instanceof FirebaseConfig :::", f7.params.dovellous.firebase);
    
      if(f7.params.dovellous.firebase instanceof FirebaseConfig){

        this.initFirebase(f7.params.dovellous.firebase);

      }else{

        const firebaseConfig:FirebaseTypeInterfaces.FirebaseConfigInterface = new FirebaseConfig(
          f7.params.dovellous.firebase.apiKey,
					f7.params.dovellous.firebase.authDomain,
					f7.params.dovellous.firebase.projectId,
					f7.params.dovellous.firebase.storageBucket,
					f7.params.dovellous.firebase.messagingSenderId,
					f7.params.dovellous.firebase.appId,
					f7.params.dovellous.firebase.measurementId,
					f7.params.dovellous.firebase.realtimeDatabaseConfig,
        )

        this.initFirebase(firebaseConfig);

      }
    
    }

    /* End Firebase Library Init */

  }

  /**
	 * Initializes the Agora Library:
   * May require these params appId, primaryCertificate, channels, tokens, imCall, videoCall, instantMessaging, liveStreaming, whiteBoard
	 * param agoraConfig AgoraConfig - A config file for all agora modules. This follows the correct Agora Config Interface
	 * return null
	 */
  initAgora (agoraConfig:AgoraTypeInterfaces.AgoraConfigInterface) {

    Agora(this.Frameworks.Framework7, agoraConfig);
    
  }

  /**
	 * Initializes the Firebase Library:
   * May require these params appId, primaryCertificate, channels, tokens, imCall, videoCall, instantMessaging, liveStreaming, whiteBoard
	 * param agoraConfig AgoraConfig - A config file for all agora modules. This follows the correct Agora Config Interface
	 * return null
	 */
  initFirebase (firebaseConfig: FirebaseTypeInterfaces.FirebaseConfigInterface ) {

    Firebase(this.Frameworks.Framework7, firebaseConfig);
    
  }

}

export {Dovellous, K, Snippets};