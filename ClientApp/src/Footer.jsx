import React from "react";

export class Footer extends React.Component {
    render() {
        return (
            <footer
                style={{ padding: "0 50px", backgroundColor: "SlateGray" }}
                className="navbar fixed-bottom"
            >
                <p>I am a footer</p>
            </footer>
        );
    }
}
