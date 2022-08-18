import React, { useEffect, useRef, useState } from "react";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {Snippets, ModuleBaseClasses, K} from "../../../libraries/app/helpers";
export default ({ avatarSrc, userOnlineStatus, elementId, canvasWidth }) => {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const[imageLocalFilename, setImageLocalFilename] = useState(avatarSrc);

    const saveImageToLocalFileSystem = async (path: any, fileName: any, imageData: any) => {

        try{

            await Filesystem.writeFile({
            path: `${path}/${fileName}`,
            data: imageData,
            directory: Directory.External,
            encoding: Encoding.UTF8,
            recursive: true,
            });

        }catch(e){
            
        }
        
      };
      
      const loadImageToLocalFileSystem = async (path: any, fileName: any, callBack: any) => {

        try{

            const contents = await Filesystem.readFile({
            path: `${path}/${fileName}`,
            directory: Directory.External,
            encoding: Encoding.UTF8,
            });
            callBack(contents);

        }catch(e){
            
        }

      };

    const render = (
        src: string,
        canvasWidth: number
    ) => {
        load(src, canvasWidth, true);
    };

    const load = (
        src: string,
        canvasWidth: number,
        loadLocal: boolean,
    ) => {
        const baseImage = new Image();
        baseImage.crossOrigin = "Anonymous";
        contextRef.current = canvasRef.current.getContext("2d");
        if(loadLocal){

            try{

                loadImageToLocalFileSystem(
                    'media/images/display-images/',
                    imageLocalFilename,
                    (imageData: any)=>{
                        if(imageData){

                            console.log("::IMAGE DATA  :: loadImageToLocalFileSystem ::", imageData.data);

                            contextRef.current.putImageData(imageData.data, 0, 0, canvasWidth, canvasWidth);

                            locallyLoaded = true;

                        }
                    }
                );

            }catch(e){

                console.warn("::IMAGE DATA ERROR :: loadImageToLocalFileSystem ::", e);

            }

        }
        baseImage.onload = () => {

            contextRef.current.drawImage(
                baseImage, 0, 0, canvasWidth, canvasWidth
            );

            if(loadLocal){

                try{

                    console.log("::IMAGE DATA :: saveImageToLocalFileSystem ::", canvasRef.current.toDataURL("image/png"));

                    saveImageToLocalFileSystem(
                        'media/images/display-images/',
                        imageLocalFilename, 
                        canvasRef.current.toDataURL("image/png")
                    );

                }catch(e){

                    
                    console.log("::IMAGE DATA ERROR :: saveImageToLocalFileSystem ::", e);

                }
            
            }


        };

        baseImage.src = src;

    };

    useEffect(() => {

        const filename = Snippets.urls.url3hash(avatarSrc);

        setImageLocalFilename(filename);

        setTimeout(()=>{

            console.log("::: IMAGE FILE NAME :::", (filename===imageLocalFilename), imageLocalFilename, filename);

            render(avatarSrc, canvasWidth);

        },50);

    }, [imageLocalFilename])

    return (

        <React.Fragment>

            <div className={`im-list-view-user-online-status ${userOnlineStatus}`} />

            <canvas
                id={`im-list-view-user-avatar-${elementId}`}
                key={`im-list-view-user-avatar-${elementId}`}
                ref={canvasRef}
                width={canvasWidth}
                height={canvasWidth}
                className="im-list-view-user-avatar-canvas rounded"
            />

        </React.Fragment>

    )

};
