import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/pages/Login";

import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: !!localStorage.getItem('token'),
            user : null,
            token: localStorage.getItem('token')
        };
        this.facebookResponse = this.facebookResponse.bind(this);
    }

    logout(){
        this.setState({isLoggedIn: false, user: null, token: ''});
        localStorage.removeItem('token');
    }

    facebookResponse(response){
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch(process.env.REACT_APP_API_URL + '/api/auth/facebook', options).then(r => {
            console.log(r);
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isLoggedIn: true, user, token});
                    localStorage.setItem('token', token);
                }
            });
        })
    }

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <LoginPage isLoggedIn={this.state.isLoggedIn} facebookResponse={this.facebookResponse} />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
