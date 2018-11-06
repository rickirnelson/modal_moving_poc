import React, { Component } from 'react';
import { PageHeader, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Main from './components/Main';
import Login from './components/Login';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.fetchUser = this.fetchUser.bind(this);
    }

    fetchUser(user) {
        console.log('who dis', user)
        const data = JSON.parse(localStorage.getItem(`userData-${user}`));
        this.setState(data);
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path={`/main`} render={() => <Main user={this.state} />} />
                        <Route exact path='/' render={() => <Login getUser={this.fetchUser} /> }/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
