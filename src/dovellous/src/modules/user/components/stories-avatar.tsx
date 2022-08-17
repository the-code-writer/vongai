import React, { useEffect } from "react";
export default ({ unseenSegments, totalSegments, imageUrl, elementId, canvasDiameter, segmentColorSeen, segmentColorUnSeen, backgroundColor }) => {
  const render = (
    unseenSegments: number,
    totalSegments: number,
    imageUrl: string,
    elementId: string,
    canvasDiameter: number,
    segmentColorSeen: any,
    segmentColorUnSeen: any
  ) => {
    let strokeColorSeen = segmentColorSeen;
    let strokeColorUnSeen = segmentColorUnSeen;
    let canvas = document.getElementById(elementId);
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
      let imgOffset = strokeWidth + strokeWidth / 2
      imgctx.drawImage(
        base_image,
        imgOffset,
        imgOffset,
        canvasDiameter - (imgOffset * 2),
        canvasDiameter - (imgOffset * 2)
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
    }
  };

  useEffect(() => {
    render(unseenSegments, totalSegments, imageUrl, elementId, canvasDiameter, segmentColorSeen, segmentColorUnSeen);
  }, [unseenSegments, totalSegments, imageUrl, elementId])

  return (
    <canvas
      id={elementId}
      width={canvasDiameter}
      height={canvasDiameter}
      style={
        {
          position: `absolute`,
          backgroundColor: backgroundColor,
          border: `2px solid ${backgroundColor}`,
          borderRadius: `${canvasDiameter / 2}px`,
        }
      }
    />
  )

};
