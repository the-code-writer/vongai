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

    const roundedImage = (ctx, x, y, width, height, radius)=>{
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
    
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
            segmentColorUnSeen
        );

    };

    const load = (
        avatarSrc: any, 
        canvasWidth: number, 
        unseenSegments: number, 
        totalSegments: number,
        segmentColorSeen: string, 
        segmentColorUnSeen: string
    ) => {
        
        contextRef.current = canvasRef.current.getContext("2d");
        contextRef2.current = canvasRef.current.getContext("2d");

        let strokeColorSeen = segmentColorSeen;
        let strokeColorUnSeen = segmentColorUnSeen;
        let segmentsArray = Array.from(Array(totalSegments).keys());
        let gapsAngle = totalSegments < 2 ? 0 : 8;
        let gapsAngleX = gapsAngle / 180;
        let gapsAngleTotal = gapsAngle * totalSegments;
        let solidAngleTotal = 360 - gapsAngleTotal;
        let segmentAngle = solidAngleTotal / totalSegments;
        let segmentAngleX = segmentAngle / 180;
        let originAngle = -0.5;
        let strokeWidth = Math.ceil(canvasWidth / 20);
        let imgOffsetX = strokeWidth + strokeWidth / 2;
        let imgOffsetY = strokeWidth + strokeWidth / 2;
        let avatarWidth = canvasWidth - imgOffsetX * 2;
        let avatarHeight = canvasWidth - imgOffsetY * 2;
        
        const baseImage = new Image();
        baseImage.crossOrigin = "Anonymous";
        baseImage.onload = () => {

            contextRef.current.save();
            roundedImage(contextRef.current, imgOffsetX, imgOffsetY, avatarWidth, avatarHeight, canvasWidth*0.4999);
            contextRef.current.clip();
            contextRef.current.drawImage(baseImage, imgOffsetX, imgOffsetY, avatarWidth, avatarHeight);
            contextRef.current.restore();

        }
        
        baseImage.onerror = (error) => {
                console.log("::IMAGE LOAD ERROR ::", error);
            };

        baseImage.src = avatarSrc;

        segmentsArray.map((n, i) => {
            let startAngle = originAngle;
            let endAngle = startAngle + segmentAngleX;
            contextRef2.current.lineWidth = strokeWidth;
            contextRef2.current.strokeStyle = i < unseenSegments ? strokeColorUnSeen : strokeColorSeen;
            contextRef2.current.beginPath();
            contextRef2.current.arc(
                Math.ceil(canvasWidth / 2),
                Math.ceil(canvasWidth / 2),
                Math.ceil(canvasWidth / 2 - (strokeWidth - 2) / 2),
                startAngle * Math.PI,
                endAngle * Math.PI
            );
            contextRef2.current.stroke();
            originAngle = endAngle + gapsAngleX;
          });

    };

    useEffect(() => {
        
        setTimeout(() => {
            
            render(avatarSrc, canvasWidth, unseenSegments, totalSegments, segmentColorSeen, segmentColorUnSeen);

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
