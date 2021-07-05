import React, { useState } from "react";

interface NumObj {
    number1: number;
    number2: number;
}

function NumberObject(this: any) {
    this.number1 = Math.round(Math.random() * 100);
    this.number2 = Math.round(Math.random() * 100);
}

function CreateList() {
    //make up a list of 20 items
    let myList: NumObj[] = [];
    for (let i = 0; i < 5; i++) {
        myList[i] = new (NumberObject as any)();
    }
    return myList;
}

export const ListItems = () => {
    const [myArray, setArray] = useState(CreateList);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [answerList, setAnswerList] = useState<string[]>([]);
    // in typescript the array needs to be useState<string[]>([]);

    let current = myArray[index];

    function handleChange(event: {
        target: { value: React.SetStateAction<string> };
    }) {
        setAnswer(event.target.value);
    }

    function checkAnswer(arrayAtIndex: any, userAnswer: string) {
        if (
            (arrayAtIndex.number1 + arrayAtIndex.number2).toString() ==
            userAnswer
        ) {
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
            console.log(answerList + " Index is " + index);

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
                        onKeyDown={function (event) {
                            if (event.key === "Enter") {
                                if (checkAnswer(current, answer)) {
                                    setIsCorrect(true);
                                } else {
                                    setIsCorrect(false);
                                }
                            }
                        }}
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
                        <p style={{ color: "red", fontWeight: "bold" }}>
                            Inccorect
                        </p>
                    )
                ) : null}
            </div>
            <div>
                <p>Correct answers:</p>
                <ul>
                    {answerList.map((i) => (
                        <li key={i} style={{ color: "green" }}>
                            {i}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
