import { useState, useEffect } from 'react';

import { f7 } from 'framework7-react';

export default function useAgoraIMCallDuration()
  : {
    agoraIMCallDurationStartTimer: Function,
    agoraIMCallDurationStopTimer: Function,
    agoraIMCallDurationText: String,
  } {

    const [currentCallTimeAnswered, setCurrentCallTimeAnswered] = useState<number>(0);

    const [currentCallActionEnded, setCurrentCallActionEnded] = useState<boolean>(false);

    const [currentCallDurationSeconds, setCurrentCallDurationSeconds] = useState<number>(0);

    const [agoraIMCallDurationText, setAgoraIMCallDurationText] = useState<string>('--:--');


    const agoraIMCallDurationStartTimer = (timestampAnswered: number) => {
        setCurrentCallTimeAnswered(timestampAnswered);
    }

    const agoraIMCallDurationStopTimer = () => {
        setCurrentCallActionEnded(true);
    }

    const updateCallDuration = ( ms:number ) => {
        // 1- Convert to seconds:
        let seconds:number = ms / 1000;
        // 2- Extract hours:
        const hours = parseInt( `${(seconds / 3600)}` ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        const minutes = parseInt( `${(seconds / 60)}` ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = Math.floor(seconds % 60);
        return `${hours > 0 ? String(hours).padStart(2, '0')+":" : '' }${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    useEffect(() => {

        const answeredTimestamp:number = currentCallTimeAnswered;

        if(answeredTimestamp > 0 && currentCallActionEnded === false){

            const callDuration:number = f7.utils.now() - answeredTimestamp + 3000;

            const display:any = updateCallDuration(callDuration);

            setAgoraIMCallDurationText(display);

            setCurrentCallDurationSeconds(callDuration);                            

        }

    }, [currentCallDurationSeconds, currentCallTimeAnswered])

    return {
        agoraIMCallDurationStartTimer,
        agoraIMCallDurationStopTimer,
        agoraIMCallDurationText,
    };

}
