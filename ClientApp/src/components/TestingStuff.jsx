import React, { useState } from "react";
import { TestEvents, NameForm } from "./EventsHandling";

function MyObjects(variable1, variable2) {
    this.variable1 = variable1;
    this.variable2 = variable2;
}

MyObjects.prototype.addsANumberToVar1 = function (number) {
    return this.variable1 + " " + number;
};

MyObjects.prototype.fancyCombiner = function () {
    return this.variable1 + " " + this.variable2;
};

MyObjects.prototype.comboChicken = function (...args) {
    var myString = "";
    for (let value of args) {
        myString += value + " ";
    }
    return (
        "Combination: " + this.variable1 + " " + this.variable2 + " " + myString
    );
};

function NewObjectBasedOnMyObject(constructor, ...args) {
    var obj = {};
    constructor.apply(obj, args);
    return obj;
}

function VariableTags(props) {
    return (
        <div>
            <div>{props.object.variable1}</div>
            <div>{props.object.variable2}</div>
        </div>
    );
}

function Things() {
    // this is a hook statement
    const [visible, setVisible] = useState(true);
    const [stringAdder, setString] = useState("hello");

    let text = visible ? <div>On</div> : <div>Off</div>;
    var myVariable = new MyObjects("original var", "has been added onto var1");
    var varUsedInProps = new MyObjects("propVar", "secondProp");

    var setOutsideObjectUsingConstructor = NewObjectBasedOnMyObject(
        MyObjects,
        "Jegg",
        "Kegg"
    );

    return (
        <div>
            <h1>Hooks</h1>
            <p>This is a button. Click it to turn it on.</p>
            <button onClick={() => setVisible(!visible)}>Button</button>
            <div>{text}</div>

            <button onClick={() => setString(stringAdder + " hello ")}>
                Another Button
            </button>
            <div>{stringAdder}</div>
            <hr />
            <h3>Here I am using JavaScript objects</h3>
            <div>{myVariable.variable1}</div>
            <div>{myVariable.variable2}</div>
            <hr />
            <h3>Trying out some prototype functions</h3>
            <div>Adds a number: {myVariable.addsANumberToVar1(2)}</div>
            <div>The combiner: {myVariable.fancyCombiner()}</div>
            <div>
                Combo Chicken:{" "}
                {myVariable.comboChicken("hello", "string", "another")}
            </div>
            <hr />
            <div>
                <h3>Trying out the fancy constructor method</h3>
                <p>{setOutsideObjectUsingConstructor.variable1}</p>
            </div>
            <div>
                <h3>Using props</h3>
                <VariableTags object={varUsedInProps} />
            </div>
            <hr />
            <div>
                <h3>
                    Using a button made in another class and setting its state
                </h3>
                <p>TestButton:</p>
                <hr />
                <h3>Handline events and mapping</h3>
                <TestEvents />
            </div>
            <hr />
            <div>
                <h3>This is a small form</h3>
                <NameForm />
            </div>
        </div>
    );
}

export class Thing extends React.Component {
    render() {
        return <Things />;
    }
}

//export default Thing;
