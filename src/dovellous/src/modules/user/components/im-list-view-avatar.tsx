import React, { useEffect, useRef, useMemo, useState } from "react";
import { Snippets, K } from "../../../libraries/app/helpers";

export default ({ avatarSrc, userOnlineStatus, elementId, canvasWidth }) => {
    const canvasRef = useRef({});

    const contextRef = useRef({});

    const imageLocalFilename = useMemo(
        () => `${Snippets.urls.url2hash(avatarSrc)}.png`,
        [avatarSrc]
    );

    const saveImageToLocalFileSystem = async (
        path: any,
        fileName: any,
        imageData: any
    ) => {
        Snippets.files.lib.pathExist(
            path,
            fileName,
            (fileExists: boolean) => {
                console.log(
                    "::: saveImageToLocalFileSystem ::: PATH EXIST :::",
                    fileExists
                );

                if (fileExists) {
                    Snippets.files.lib.saveFile(
                        `${path}/${fileName}`,
                        imageData,
                        (fileObject: any): void => {
                            console.log(
                                "::SAVED FILE::",
                                `${path}/${fileName}`,
                                imageData,
                                fileObject
                            );
                        },
                        (error: any) => {
                            console.log(
                                "::SAVE ERROR::",
                                `${path}/${fileName}`,
                                imageData,
                                error
                            );
                        }
                    );
                }
            },
            true
        );
    };

    const loadImageFromLocalFileSystem = async (
        path: any,
        fileName: any,
        callBack: any
    ) => {
        Snippets.files.lib.pathExist(
            path,
            fileName,
            (fileExists: boolean) => {
                if (fileExists) {
                    Snippets.files.lib.readFile(
                        `${path}/${fileName}`,
                        (imageData: any) => {
                            console.log("::READ FILE::", `${path}/${fileName}`, imageData);
                            callBack(imageData);
                        },
                        (error: any) => {
                            console.log("::READ ERROR::", `${path}/${fileName}`, error);
                        }
                    );
                }
            },
            true
        );
    };

    const render = (src: string, canvasWidth: number) => {
        load(src, canvasWidth, true);
    };

    const load = (
        src: string,
        canvasWidth: number,
        saveAndLoadLocal: boolean
    ) => {

        if(canvasRef.current !== null && typeof canvasRef.current !== "undefined"){

            const baseImage = new Image();

            baseImage.crossOrigin = "Anonymous";

            contextRef.current = canvasRef.current.getContext("2d");

            let locallyLoaded = false;

            if (saveAndLoadLocal) {
                try {
                    loadImageFromLocalFileSystem(
                        K.Files.Paths.IM_DISPLAY_PROFILE_IMAGE,
                        imageLocalFilename,
                        (imageData: any) => {
                            if (imageData) {
                                console.log(
                                    "::IMAGE DATA  :: loadImageFromLocalFileSystem ::",
                                    imageData.data
                                );

                                contextRef.current.putImageData(
                                    imageData.data,
                                    0,
                                    0,
                                    canvasWidth,
                                    canvasWidth
                                );

                                locallyLoaded = true;
                            }
                        }
                    );
                } catch (e) {
                    console.warn(
                        "::IMAGE DATA ERROR :: loadImageFromLocalFileSystem ::",
                        e
                    );
                }

                if (!locallyLoaded) {
                    baseImage.onload = () => {
                        contextRef.current.drawImage(
                            baseImage,
                            0,
                            0,
                            canvasWidth,
                            canvasWidth
                        );

                        if (saveAndLoadLocal) {
                            try {
                                const imageData = canvasRef.current.toDataURL(
                                    K.Files.MimeTypes.Images.PNG
                                );

                                console.log(
                                    "::IMAGE DATA :: saveImageToLocalFileSystem ::",
                                    imageData
                                );

                                saveImageToLocalFileSystem(
                                    K.Files.Paths.IM_DISPLAY_PROFILE_IMAGE,
                                    imageLocalFilename,
                                    imageData
                                );
                            } catch (e) {
                                console.log(
                                    "::IMAGE DATA ERROR :: saveImageToLocalFileSystem ::",
                                    e
                                );
                            }
                        }
                    };

                    baseImage.onerror = (error) => {
                        console.log("::IMAGE LOAD ERROR ::", error);
                    };

                    baseImage.src = src;
                }
            }

        }

    };

    useEffect(() => {
        //const filename = `${Snippets.urls.url2hash(avatarSrc)}.png`;

        //setImageLocalFilename(filename); 

        setTimeout(() => {
            
            render(avatarSrc, canvasWidth);

        });

    }, [imageLocalFilename]);

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
    );
};
