import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Image } from 'react-bootstrap';
import Header from './Header';
import '../App.css';


class Login extends Component {
    constructor(props) {
        super(props);

        this.setUser = this.setUser.bind(this);
    }

    setUser(e) {
        this.props.getUser(e.target.value)
        this.props.history.push('/main');
    }

    render() {
        return (
            <div>
                <Header />
                <div style={{ display:'flex', justifyContent: 'center' }}>
                    <Button onClick={this.setUser} value="Joe">
                        Joe
                    </Button>
                    <Button onClick={this.setUser} value="Jenny">
                        Jenny
                    </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
