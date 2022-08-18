import React, { useEffect, useRef, useMemo, useState } from "react";
import { Snippets, K } from "../../../libraries/app/helpers";

export default ({ avatarSrc, elementId, canvasWidth, unseenSegments, totalSegments, segmentColorSeen, segmentColorUnSeen, backgroundColor }) => {

    const canvasRef = useRef({});

    const contextRef = useRef({});

    const contextRef2 = useRef({});

    const imageLocalFilename = useMemo(
        () => `${Snippets.urls.url3hash(avatarSrc)}.png`,
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
    
    const render = (
        avatarSrc: any, 
        canvasWidth: number, 
        unseenSegments: number, 
        totalSegments: number,
        segmentColorSeen: string, 
        segmentColorUnSeen: string
      ) => {
        
        load(
            avatarSrc,
            canvasWidth, 
            unseenSegments,
            totalSegments,
            segmentColorSeen,
            segmentColorUnSeen,
            true
        );

    };

    const load = (
        avatarSrc: any, 
        canvasWidth: number, 
        unseenSegments: number, 
        totalSegments: number,
        segmentColorSeen: string, 
        segmentColorUnSeen: string,
        saveAndLoadLocal: boolean
    ) => {
        const baseImage = new Image();

        baseImage.crossOrigin = "Anonymous";

        contextRef.current = canvasRef.current.getContext("2d");
        contextRef2.current = canvasRef.current.getContext("2d");

        let locallyLoaded = false;
        let strokeColorSeen = segmentColorSeen;
        let strokeColorUnSeen = segmentColorUnSeen;
        let segmentsArray = Array.from(Array(totalSegments).keys());
        let gapsAngle = totalSegments < 2 ? 0 : 7.5;
        let gapsAngleX = gapsAngle / 180;
        let gapsAngleTotal = gapsAngle * totalSegments;
        let solidAngleTotal = 360 - gapsAngleTotal;
        let segmentAngle = solidAngleTotal / totalSegments;
        let segmentAngleX = segmentAngle / 180;
        let originAngle = -0.5;
        let strokeWidth = canvasWidth / 20;
        let imgOffset = strokeWidth + strokeWidth / 2;

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
                                imgOffset,
                                imgOffset,
                                canvasWidth - (imgOffset * 2),
                                canvasWidth - (imgOffset * 2)
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
                        imgOffset,
                        imgOffset,
                        canvasWidth - (imgOffset * 2),
                        canvasWidth - (imgOffset * 2)
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

                baseImage.src = avatarSrc;
            }
        }

        segmentsArray.map((n, i) => {
            let startAngle = originAngle;
            let endAngle = startAngle + segmentAngleX;
            contextRef2.current.lineWidth = strokeWidth;
            contextRef2.current.strokeStyle = i < unseenSegments ? strokeColorUnSeen : strokeColorSeen;
            contextRef2.current.beginPath();
            contextRef2.current.arc(
              canvasWidth / 2,
              canvasWidth / 2,
              canvasWidth / 2 - (strokeWidth - 2) / 2,
              startAngle * Math.PI,
              endAngle * Math.PI
            );
            contextRef2.current.stroke();
            originAngle = endAngle + gapsAngleX;
          });

    };

    useEffect(() => {
        
        setTimeout(() => {
            
            render(avatarSrc, canvasWidth, unseenSegments, totalSegments, canvasWidth, segmentColorSeen, segmentColorUnSeen);

        });

    }, [imageLocalFilename]);

    return (
        <React.Fragment>
            <canvas
                id={`im-list-view-user-avatar-story-${elementId}`}
                key={`im-list-view-user-avatar-story-${elementId}`}
                ref={canvasRef}
                width={canvasWidth}
                height={canvasWidth}
                style={
                    {
                      position: `absolute`,
                      backgroundColor: backgroundColor,
                      border: `2px solid ${backgroundColor}`,
                      borderRadius: `${Math.ceil(canvasWidth/2)}px`,
                    }
                }
                className="im-list-view-user-avatar-story-canvas rounded"
            />
        </React.Fragment>
    );
};
