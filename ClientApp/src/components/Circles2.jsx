import React, { useEffect, useState } from "react";
import "./../CSSStuff/Circle.css";

function toPixel(pixleValue) {
    let returnedPixle;

    if (Number.isNaN(pixleValue)) {
        return "0px";
    }

    returnedPixle = parseInt(pixleValue) + "px";
    return returnedPixle;
}

function determineLeftPos(angle, circleSize) {
    //let value = angle * (Math.PI / 180);
    return toPixel(
        250 + Math.sin(angle * (Math.PI / 180)) * 250 - circleSize / 2
    );
}

function determineTopPos(angle, circleSize) {
    return toPixel(
        250 - Math.cos(angle * (Math.PI / 180)) * 250 - circleSize / 2
    );
}

export function CirclesView() {
    const tezt = "1122".split("");
    return (
        <div>
            <div
                className="circle"
                id="outerCircle"
                style={{
                    width: "550px",
                    height: "550px",
                }}
            />
            <div className="circle" id="outerCircle" />
            <div className="circleWrapper">
                {tezt.map((letter, i) => (
                    <Circle
                        key={letter}
                        content={letter}
                        circleSize={32}
                        startingAngle={360 / (i + 1)}
                    />
                ))}
            </div>
        </div>
    );
}

function Circle(props) {
    const { startingAngle, circleSize, content } = props;

    const [angle, setAngle] = useState(startingAngle);

    useEffect(() => {
        requestAnimationFrame(() => setAngle(angle + 1));
        //const timer = setTimeout(() => {
        //     ;
        //}, 5);
        // return () => clearTimeout(timer);
    });

    return (
        <div
            className="circle littleCircle"
            id="smallCircle"
            style={{
                left: determineLeftPos(angle, circleSize),
                top: determineTopPos(angle, circleSize),
                width: circleSize,
                height: circleSize,
            }}
        >
            {content}
        </div>
    );
}
