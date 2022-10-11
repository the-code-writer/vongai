interface UserDataObject {
    username: string;
    displayName: string;
    displayStatus: string;
    displayPhoto: string;
    phoneNumber: string | number;
    emailAddress: string;
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
    uid: String;
    userData: UserDataObject;
    destination: CallDestinationObject | null;
    origin: CallOriginObject | null;
    callStartedTimestamp?: Number;
    callAnsweredTimestamp?: Number;
    callEndedTimestamp?: Number;
    callDuration?: Number;
    callDialAttempts?: any;
    callSessionID: String;
    callSessionChannel: String;
    callHooks?: any;
    isVideoCall: Boolean;
    isIncoming: Boolean;
}

export { 
    UserDataObject, 
    CallDestinationObject,
    CallOriginObject,
    CallDataObject,
} 