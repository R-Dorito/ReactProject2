import React, { useEffect, useState } from "react";
import "./../CSSStuff/Circle.css";

/*
    things to do:
    State and prop heirarchy trickle down and up. 
    (https://reactjs.org/docs/lifting-state-up.html)
*/

export function Circles() {
    let draw = (
        <div>
            <div className="circle" id="outerCircle"></div>

            <MakeCircle desiredAngle={34} />
        </div>
    );
    return draw;
}

function MakeCircle(desiredAngle) {
    const [angle, setAngle] = useState(0);
    const [circleSize, setSize] = useState(50);

    function toPixel(pixleValue) {
        let returnedPixle;

        if (Number.isNaN(pixleValue)) {
            return "0px";
        }

        returnedPixle = pixleValue.toString() + "px";
        return returnedPixle;
    }

    function determineLeftPos(angle) {
        //let value = angle * (Math.PI / 180);
        return toPixel(
            250 + Math.sin(angle * (Math.PI / 180)) * 250 - circleSize / 2
        );
    }

    function determineTopPos(angle) {
        return toPixel(
            250 - Math.cos(angle * (Math.PI / 180)) * 250 - circleSize / 2
        );
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setAngle(angle + 1);
        }, 10);
        return () => clearTimeout(timer);
    });

    const circles = (
        <div
            className="circle"
            id="smallCircle"
            style={{
                left: determineLeftPos(angle),
                top: determineTopPos(angle),
                width: circleSize,
                height: circleSize,
            }}
        />
    );
    return circles;
}
