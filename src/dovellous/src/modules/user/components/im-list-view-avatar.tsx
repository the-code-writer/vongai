import Dom7 from "dom7";
import React, { useCallback, useEffect } from "react";
export default ({ avatarSrc, userOnlineStatus, elementId, canvasDiameter }) => {
  const render = (
    src: string,
    elementId: string,
    canvasDiameter: number
  ) => {
    const img = Dom7(`#im-list-view-user-avatar-img-${elementId}`);
    img.attr('src', src);
    const canvas = document.getElementById(`im-list-view-user-avatar-${elementId}`);
    const baseImage = new Image();
    baseImage.src = src;    
    baseImage.onload = () => {
        const imgctx = canvas.getContext("2d");
        console.warn(":::BASE_IMAGE:::", canvas, imgctx, src, elementId, canvasDiameter, baseImage)
        imgctx.drawImage(
            baseImage,
            0,
            0,
            canvasDiameter,
            canvasDiameter
        );
    };
  };

  useEffect(() => {

    render(avatarSrc, elementId, canvasDiameter);

  }, [])

  return (

    <React.Fragment>

        <div className={`im-list-view-user-online-status ${userOnlineStatus}`} />

        <canvas
            id={`im-list-view-user-avatar-${elementId}`}
            key={`im-list-view-user-avatar-${elementId}`}
            width={canvasDiameter}
            height={canvasDiameter}
            className="im-list-view-user-avatar-canvas rounded"
            />

        <img
            id={`im-list-view-user-avatar-img-${elementId}`}
            key={`im-list-view-user-avatar-img-${elementId}`}
            width={canvasDiameter}
            height={canvasDiameter}
            className="im-list-view-user-avatar-canvas rounded"
            style={{display: 'block', position: 'absolute'}}
            />

    </React.Fragment>

  )

};
