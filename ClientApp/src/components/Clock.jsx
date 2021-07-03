import React from "react";

function Time(props) {
    return (
        <div>
            {props.clock.hour}:{props.clock.minute}:{props.clock.second}
        </div>
    );
}

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            second: 0,
            minute: 0,
            hour: 0,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            second: this.state.second + 1,
        });
        if (this.state.second >= 60) {
            this.setState({
                second: 0,
                minute: this.state.minute + 1,
            });
        }
        if (this.state.minute >= 60) {
            this.setState({
                minute: 0,
                hour: this.state.hour + 1,
            });
        }
        if (this.state.hour >= 24) {
            this.setState({
                hour: 0,
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <Time clock={this.state} />
            </div>
        );
    }
}
