import {UID} from 'agora-rtc-sdk-ng';
  
  interface UserDataObject {
    username: string;
    displayName: string;
    displayStatus: string;
    displayPhoto: string;
    phoneNumber: string | number;
    emailAddress: string;
}

interface CallUserObject {
    uid: string;
    phoneNumber: any;
    displayName: string;
    displayPhoto?: string;
    username?: string;
}

interface CallDestinationObject {
    phoneNumber: any;
    displayName: any;
}

interface CallOriginObject {
    phoneNumber: any;
    displayName: any;
}

interface CallDataObject {
    uid: UID | null | undefined;
    userData: UserDataObject;
    destination: CallDestinationObject | null;
    origin: CallOriginObject | null;
    callStartedTimestamp?: Number;
    callAnsweredTimestamp?: Number;
    callEndedTimestamp?: Number;
    callDuration?: Number;
    callDialAttempts?: any;
    callSession: String;
    callChannel: String;
    callHooks?: any;
    isVideoCall: Boolean;
    isIncoming: Boolean;
    isGroupCall?: Boolean;
    isEncrypted?: Boolean;
}

interface CallParticipant {
    uid: string;
    startedTimestamp: number;
    endedTimestamp: number;
    phoneNumber: any;
    displayName: string;
    displayPhoto: any;
    username?: string;
}

interface CallItem {
    startedTimestamp: number;
    endedTimestamp?: number;
    origin: CallUserObject;
    destination: CallUserObject;
    isVideoCall: boolean;
    isGroupCall: boolean;
    isIncoming?: boolean;
    isEncrypted?: boolean;
    groupId?:string;
    channel: string;
    session: string;
    uid: string | number;
}

interface CallParticipantsSession {
    payload: CallItem;
    participants: CallParticipant[];
}

export { 
    UserDataObject, 
    CallUserObject,
    CallDestinationObject,
    CallOriginObject,
    CallDataObject,
    CallItem,
    CallParticipant,
    CallParticipantsSession,
} 