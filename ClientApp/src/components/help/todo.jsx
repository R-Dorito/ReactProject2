import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import { Modal } from "../modal";
import "./dataTable.css";

export const TodoList = () => {
    const { request, get, post, del, put, response, loading, error } = useFetch(
        "http://localhost:3001/api/ToDoItems",
        {
            cachePolicy: "no-cache",
        }
    ); // onMount
    const [inputField, setInputField] = useState("");
    const [isCheckboxTicked, setIsComplete] = useState(false);
    const [todos, setTodos] = useState([]);
    const [popup, setPopup] = useState(false);

    async function loadInitialTodos() {
        await get("/").then((data) => setTodos(data));
    }

    async function handleClick(id) {
        await del("/" + id).then(loadInitialTodos);
    }

    async function makePost() {
        await post({
            name: inputField,
            isComplete: isCheckboxTicked,
        }).then(loadInitialTodos);
    }

    async function makePut(id) {
        await put("/" + id, {
            id: id,
            name: "edit",
            isComplete: isCheckboxTicked,
        }).then(loadInitialTodos);
    }

    useEffect(() => {
        loadInitialTodos();
    }, []); // componentDidMount

    function sendRequest(e) {
        setInputField(e.target.value);
    }

    function changeIsChecked(e) {
        setIsComplete(e.target.checked);
    }

    function displayModal() {
        setPopup(true);
    }
    function hideModal() {
        setPopup(false);
    }

    return (
        <div className="page">
            <div id="innerDiv" className="formDiv">
                <form onSubmit={makePost}>
                    <h4>Add new Input</h4>
                    <div className="innerDiv">
                        <p>What is the name?</p>
                        <input
                            type="text"
                            value={inputField}
                            onChange={sendRequest}
                        />
                    </div>

                    <div className="innerDiv">
                        <p>Is Checked?</p>
                        <input
                            name="Is it Complete?"
                            type="checkbox"
                            checked={isCheckboxTicked}
                            onChange={changeIsChecked}
                        />
                    </div>

                    <input
                        className="submitButton"
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>

            <h4>Items Grid</h4>
            <div className="grid">
                <div className="gridCell bold">ID</div>
                <div className="gridCell bold">Name</div>
                <div className="gridCell bold">Is Checked</div>
                <div className="gridCell bold">Delete</div>
                <div className="gridCell bold">Edit</div>
                {todos
                    .sort((itemA, itemB) => itemA.id - itemB.id)
                    .map((todo) => (
                        <React.Fragment key={todo.id}>
                            <div className="gridCell">{todo.id}</div>
                            <div className="gridCell ">{todo.name}</div>
                            <div className="gridCell ">
                                {todo.isComplete ? "true" : "false"}
                            </div>
                            <div className="gridCell">
                                <button onClick={() => handleClick(todo.id)}>
                                    X
                                </button>
                            </div>
                            <div className="gridCell">
                                {/*<button onClick={() => makePut(todo.id)}>*/}
                                <button onClick={() => displayModal()}>
                                    Edit
                                </button>
                                {popup ? (
                                    <Modal>
                                        <div className="myModal">
                                            <div className="innerModal">
                                                I am a modal for {todo.id}
                                                <br />
                                                <button
                                                    onClick={() => hideModal()}
                                                >
                                                    close Modal
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                ) : null}
                            </div>
                        </React.Fragment>
                    ))}
            </div>
        </div>
    );
};
