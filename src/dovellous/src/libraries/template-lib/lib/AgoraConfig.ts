import { InstantMessagingConfig } from "../apps/instant-messaging/InstantMessagingConfig";
import { LiveStreamingConfig } from "../apps/live-streaming/LiveStreamingConfig";
import { VideoCallConfig } from "../apps/video/VideoCallConfig";
import { VoiceCallConfig } from "../apps/voice/VoiceCallConfig";
import { WhiteBoardConfig } from "../apps/white-board/WhiteBoardConfig";

export interface AgoraConfig {
  instantMessaging:InstantMessagingConfig,
  liveStreaming:LiveStreamingConfig,
  videoCall: VideoCallConfig,
  voiceCall: VoiceCallConfig,
  whiteBoard: WhiteBoardConfig
}

export class Config implements AgoraConfig {

  instantMessaging:InstantMessagingConfig;
  liveStreaming:LiveStreamingConfig;
  videoCall: VideoCallConfig;
  voiceCall: VoiceCallConfig;
  whiteBoard: WhiteBoardConfig;

  constructor(
    instantMessaging:InstantMessagingConfig,
  liveStreaming:LiveStreamingConfig,
  videoCall: VideoCallConfig,
  voiceCall: VoiceCallConfig,
  whiteBoard: WhiteBoardConfig
  ) {
    this.instantMessaging = instantMessaging;
    this.liveStreaming = liveStreaming;
    this.videoCall = videoCall;
    this.voiceCall = voiceCall;
    this.whiteBoard = whiteBoard;
  }

}
