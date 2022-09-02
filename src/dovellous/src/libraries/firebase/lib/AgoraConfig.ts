import { InstantMessagingConfig } from "../apps/instant-messaging/InstantMessagingConfig";
import { LiveStreamingConfig } from "../apps/live-streaming/LiveStreamingConfig";
import { VideoCallConfig } from "../apps/video/VideoCallConfig";
import { IMCallConfig } from "../apps/voice/IMCallConfig";
import { WhiteBoardConfig } from "../apps/white-board/WhiteBoardConfig";

export interface AgoraConfig {
  instantMessaging:InstantMessagingConfig,
  liveStreaming:LiveStreamingConfig,
  videoCall: VideoCallConfig,
  imCall: IMCallConfig,
  whiteBoard: WhiteBoardConfig
}

export class Config implements AgoraConfig {

  instantMessaging:InstantMessagingConfig;
  liveStreaming:LiveStreamingConfig;
  videoCall: VideoCallConfig;
  imCall: IMCallConfig;
  whiteBoard: WhiteBoardConfig;

  constructor(
    instantMessaging:InstantMessagingConfig,
  liveStreaming:LiveStreamingConfig,
  videoCall: VideoCallConfig,
  imCall: IMCallConfig,
  whiteBoard: WhiteBoardConfig
  ) {
    this.instantMessaging = instantMessaging;
    this.liveStreaming = liveStreaming;
    this.videoCall = videoCall;
    this.imCall = imCall;
    this.whiteBoard = whiteBoard;
  }

}
