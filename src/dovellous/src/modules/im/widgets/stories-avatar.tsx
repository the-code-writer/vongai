import React from "react";

export default ({unseenSegments, totalSegments, imageUrl, elementId, canvasDiameter, segmentColor, addToDOM}) => {

  const StoriesAvatar = (
    unseenSegments: number,
    totalSegments: number,
    imageUrl: string,
    elementId: string,
    canvasDiameter: number,
    segmentColor: any,
    addToDOM: any
  ) => {
    let canvas: any;
    let backgroundColor = "rgb(255,255,255)";
    let strokeColorSeen = "rgb(180,180,180)";
    let strokeColorUnSeen = segmentColor;
    if (elementId) {
      canvas = document.getElementById(elementId);
    } else {
      canvas = document.createElement("canvas");
      canvas.id = elementId;
      canvas.width = canvasDiameter;
      canvas.height = canvasDiameter;
      canvas.style.zIndex = 8;
      canvas.style.position = "absolute";
      canvas.style.backgroundColor = backgroundColor;
      canvas.style.border = `1px solid ${backgroundColor}`;
      canvas.style.borderRadius = `${canvasDiameter / 2}px`;
    }
    let segmentsArray = Array.from(Array(totalSegments).keys());
    let gapsAngle = totalSegments < 2 ? 0 : 7.5;
    let gapsAngleX = gapsAngle / 180;
    let gapsAngleTotal = gapsAngle * totalSegments;
    let solidAngleTotal = 360 - gapsAngleTotal;
    let segmentAngle = solidAngleTotal / totalSegments;
    let segmentAngleX = segmentAngle / 180;
    let originAngle = -0.5;
    let strokeWidth = canvasDiameter / 20;
    let base_image = new Image();
    base_image.src = imageUrl;
    base_image.onload = () => {
      let imgctx = canvas.getContext("2d");
      imgctx.drawImage(
        base_image,
        strokeWidth + strokeWidth / 2,
        strokeWidth + strokeWidth / 2,
        canvasDiameter - (strokeWidth + strokeWidth / 2) * 2,
        canvasDiameter - (strokeWidth + strokeWidth / 2) * 2
      );
      segmentsArray.map((n, i) => {
        let startAngle = originAngle;
        let endAngle = startAngle + segmentAngleX;
        let ctx = canvas.getContext("2d");
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = i < unseenSegments ? strokeColorUnSeen : strokeColorSeen;
        ctx.beginPath();
        ctx.arc(
          canvasDiameter / 2,
          canvasDiameter / 2,
          canvasDiameter / 2 - (strokeWidth - 2) / 2,
          startAngle * Math.PI,
          endAngle * Math.PI
        );
        ctx.stroke();
        originAngle = endAngle + gapsAngleX;
      });
    };
    if (addToDOM) {
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(canvas);
    } else {
      return canvas;
    }
  };

  return (  
    <StoriesAvatar
        unseenSegments={unseenSegments}
        totalSegments={totalSegments}
        imageUrl={imageUrl}
        elementId={elementId}
        canvasDiameter={canvasDiameter}
        segmentColor={segmentColor}
        addToDOM={addToDOM}
    />
  )

};
