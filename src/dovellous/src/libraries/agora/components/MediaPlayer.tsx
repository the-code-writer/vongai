import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";

export interface VideoPlayerProps {
  uuid: any;
  user?: any;
  isBackdrop?: boolean;
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack?: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
    };
  }, [container, props.videoTrack]);
  useEffect(() => {
    if(props.audioTrack){
      props.audioTrack?.play();
    }
    return () => {
      props.audioTrack?.stop();
    };
  }, [props.audioTrack]);
  return (
    <div ref={container}  className={`im-vc-video-player-wrapper ${props.isBackdrop?'backdrop':''}`} ></div>
  );
}

export default MediaPlayer;