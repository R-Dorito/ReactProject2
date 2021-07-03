import React from "react";

function NumberList(props) {
    const nums = props.numbers;
    const mult = props.multiplier;
    let keyValue = 1;

    // the location where the mapping happens is where the key should be
    const listItem = nums.map((i) => (
        <li key={keyValue}>
            {keyValue++}: {i * mult}
        </li>
    ));

    return <ul>{listItem}</ul>;
}

class RandomClass extends React.Component {
    render() {
        return <div>Hello, I am from another class in a single file.</div>;
    }
}

export class TestEvents extends React.Component {
    // it is better to bind inside the constructor if you are passing in
    // the button or something as a prop.
    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            isClick: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleClick() {
        if (!this.state.isClick) {
            this.setState({
                isClick: !this.state.isClick,
            });
        } else {
            this.setState({
                isClick: !this.state.isClick,
            });
        }
        this.setState({
            value: this.state.value + 2,
        });
    }

    handleReset() {
        this.setState({
            value: 2,
        });
    }

    render() {
        const values = [1, 2, 3, 4, 5, 6];
        return (
            <div>
                <button onClick={() => this.handleClick()}>
                    Multiply by: {this.state.value}
                </button>
                <button onClick={() => this.handleReset()}>Reset</button>
                <RandomClass />

                <p>A list of numbers</p>
                <NumberList numbers={values} multiplier={this.state.value} />
            </div>
        );
    }
}

export class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "I am premade text",
            isSet: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        this.setState({
            isSet: true,
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h4>Name:</h4>
                        <textarea
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <p>
                    {this.state.isSet
                        ? "Welcome " + this.state.value
                        : "Has not been set yet"}
                </p>
            </div>
        );
    }
}
