import { AgoraError } from "./lib/AgoraErrors";

import { Config, AgoraConfig } from "./lib/AgoraConfig";

import { IMCall } from "./apps/voice/IMCall";

import { VideoCall } from "./apps/video/VideoCall";

import { InstantMessaging } from "./apps/instant-messaging/InstantMessaging";

import { LiveStreaming } from "./apps/live-streaming/LiveStreaming";

import { WhiteBoard } from "./apps/white-board/WhiteBoard";
import { IMCallConfig } from "./apps/voice/IMCallConfig";
import { VideoCallConfig } from "./apps/video/VideoCallConfig";
import { InstantMessagingConfig } from "./apps/instant-messaging/InstantMessagingConfig";
import { LiveStreamingConfig } from "./apps/live-streaming/LiveStreamingConfig";
import { WhiteBoardConfig } from "./apps/white-board/WhiteBoardConfig";

export class Agora {
  
  private readonly config: AgoraConfig;

  public imCall: IMCall;
  public videoCall: VideoCall;
  public instantMessaging: InstantMessaging;
  public liveStreaming: LiveStreaming;
  public whiteBoard: WhiteBoard;

  /**
   * Agora Constructor
   * @param database .
   */

  constructor(
    authentication: IMCallConfig | Config,
    firestore: VideoCallConfig,
    messaging: InstantMessagingConfig,
    storage: LiveStreamingConfig,
    database: WhiteBoardConfig
  ) {
    if (authentication instanceof Config) {
      this.config = authentication;
    } else {
      this.config = new Config(
        authentication,
        firestore,
        messaging,
        storage,
        database
      );
    }

    if (!this.config) {
      throw new AgoraError("Firebase error", 1);
    }

  }

  private initIMCall() {
    this.imCall = new IMCall(
      this.config.imCall
    );
  }

  private initVideoCall() {
    this.videoCall = new VideoCall(
      this.config.videoCall
      );
  }

  private initInstantMessaging() {
    this.instantMessaging = new InstantMessaging(
      this.config.instantMessaging
      );
  }

  private initLiveStreaming() {
    this.liveStreaming = new LiveStreaming(
      this.config.liveStreaming
      );
  }

  private initWhiteBoard() {
    this.whiteBoard = new WhiteBoard(
      this.config.whiteBoard
    );
  }

  public imCallStart(): {} {

    return this.imCall.startCall();

  }

}
