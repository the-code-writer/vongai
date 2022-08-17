import React, { useEffect, useRef } from "react";

export default ({ avatarSrc, userOnlineStatus, elementId, canvasWidth }) => {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const render = (
        src: string,
        canvasWidth: number
    ) => {
        const baseImage = new Image();
        contextRef.current = canvasRef.current.getContext("2d");
        baseImage.onload = () => {
            contextRef.current.drawImage(
                baseImage, 0, 0, canvasWidth, canvasWidth
            );
        };
        baseImage.src = src;
    };

    const load = (
        src: string,
        canvasWidth: number
    ) => {
        const baseImage = new Image();
        contextRef.current = canvasRef.current.getContext("2d");
        baseImage.onload = () => {
            contextRef.current.drawImage(
                baseImage, 0, 0, canvasWidth, canvasWidth
            );
        };
        baseImage.src = src;
    };

    const saveImage = () => {

        contextRef.current.getImageData(0, 0, canvasWidth, canvasWidth);

    }

    const loadImage = (imageData) => {

        contextRef.current.putImageData(imageData, 0, 0, canvasWidth, canvasWidth);

    }

    useEffect(() => {

        render(avatarSrc, canvasWidth);

    }, [])

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
