import React, { Component } from "react";
import { Alert } from "reactstrap";

export class RitasText extends Component {
    constructor(props) {
        super(props);
        this.state = { RandomData: "", loading: true };
    }

    async fill() {
        // fetching from a file called "random file" in the C# backend code
        const response = await fetch("RandomFile");

        // problem was that the return type of this endpoint was not an object that you could deserialize
        const data = await response.text();
        this.setState({ RandomData: data, loading: false });
    }

    componentDidMount() {
        this.fill();
    }

    static DoThing(RandomData) {
        return <div>{RandomData}</div>;
    }

    render() {
        let contents = this.state.loading ? (
            <p>Is loading</p>
        ) : (
            RitasText.DoThing(this.state.RandomData)
        );

        return (
            <div>
                Hello
                {contents}
                <Alert color="primary">Message Is here</Alert>
            </div>
        );
    }
}
