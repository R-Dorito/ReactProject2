import React, { Component, Fragment } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { RitasText } from "./components/RitasText";
import { Thing } from "./components/TestingStuff";
import { Clock } from "./components/Clock.jsx";
import { ListItems } from "./components/ListingItems";
import { Calculator } from "./components/TemperatureChanger";
import { CommentBox } from "./components/Tutorials/Tutorial";

import "./custom.css";
import { CirclesView } from "./components/Circles2";
import { TodoList } from "./components/help/todo";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                <Layout>
                    <Route path="/ritas-text" component={RitasText} />
                    <Route path="/ritas-button-state" component={Thing} />
                    <Route path="/ritas-clock" component={Clock} />
                    <Route path="/ritas-list" component={ListItems} />
                    <Route
                        path="/ritas-temperature-converter"
                        component={Calculator}
                    />
                    <Route path="/circles" component={CirclesView} />
                    <Route path="/comments" component={CommentBox} />
                    <Route path="/todo" component={TodoList} />
                </Layout>
            </>
        );
    }
}
