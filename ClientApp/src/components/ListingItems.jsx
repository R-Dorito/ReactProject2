import React, { useState } from "react";

function NumberObject() {
    this.number1 = Math.round(Math.random() * 100);
    this.number2 = Math.round(Math.random() * 100);
}

function CreateList() {
    //make up a list of 20 items
    let myList = [];
    for (let i = 0; i < 5; i++) {
        myList[i] = new NumberObject();
    }
    return myList;
}

export const ListItems = (props) => {
    const [myArray, setArray] = useState(CreateList);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [answerList, setAnswerList] = useState([]);

    let current = myArray[index];

    function handleChange(event) {
        setAnswer(event.target.value);
    }

    function checkAnswer(arrayAtIndex, userAnswer) {
        if (arrayAtIndex.number1 + arrayAtIndex.number2 == userAnswer) {
            setAnswer("");
            setAnswerList((answerList) => [
                ...answerList,
                arrayAtIndex.number1 +
                    " + " +
                    arrayAtIndex.number2 +
                    " = " +
                    userAnswer,
            ]);

            setIndex(index < myArray.length - 1 ? index + 1 : 0);
            return true;
        } else {
            setButtonClicked(true);
            return false;
        }
    }

    return (
        <div>
            <h3>Addition page!</h3>

            {index < myArray.length ? (
                <div>
                    <h4 style={{ color: "blue" }}>Problem: {index + 1}</h4>
                    <div>
                        {current.number1} + {current.number2}
                    </div>
                    <input
                        type="text"
                        value={answer}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <button
                        onClick={() =>
                            checkAnswer(current, answer)
                                ? setIsCorrect(true)
                                : setIsCorrect(false)
                        }
                    >
                        Button
                    </button>
                </div>
            ) : (
                <div>No more questions, good job</div>
            )}

            <div>
                {buttonClicked ? (
                    isCorrect ? (
                        ""
                    ) : (
                        <text style={{ color: "red", fontWeight: "bold" }}>
                            Inccorect
                        </text>
                    )
                ) : null}
            </div>
            <div>
                <p>Correct answers:</p>
                {answerList.map((i) => (
                    <div style={{ color: "green" }}>{i}</div>
                ))}
            </div>
        </div>
    );
};
