import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";

import PrivateRoute from './components/helpers/PrivateRoute';

import LoginPage from "./components/pages/Login";
import ProfilePage from "./components/pages/Profile";
import TeamsPage from "./components/pages/Teams";
import TournamentsPage from "./components/pages/Tournaments";

import BottomNav from "./components/partials/BottomNav";

import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
            user : null,
            isLoaded: false
        };
        this.facebookResponse = this.facebookResponse.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/api/users/me', {method: 'GET', credentials: "include"}).then(r => {
            if(r.status === 200){
                r.json().then((function(user){
                   console.log(user);
                    this.setState({isLoggedIn: true, isLoaded: true, user});
                }).bind(this)).catch(function(e){
                    console.log(e);
                });
            }
            else {
                this.setState({isLoaded: true});
            }
        })
    }

    logout(){
        this.setState({isLoggedIn: false, user: null, isLoaded: false});
    }

    facebookResponse(response){
        console.log(response);
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            credentials: "include"
        };
        fetch(process.env.REACT_APP_API_URL + '/api/auth/facebook', options).then(r => {
            console.log(r.headers);
            r.json().then(user => {
                console.log(user);
                this.setState({isLoggedIn: true, user});
            });
        })
    }

    render(){
        return (
            this.state.isLoaded ?
                (<BrowserRouter>
                    {this.state.isLoggedIn &&
                        <BottomNav/>
                    }
                    <Switch>
                        <Route exact path="/">
                            <LoginPage isLoggedIn={this.state.isLoggedIn} facebookResponse={this.facebookResponse}/>
                        </Route>
                        <PrivateRoute path="/profile" isAuthenticated={this.state.isLoggedIn}>
                            <ProfilePage user={this.state.user}/>
                        </PrivateRoute>
                        <PrivateRoute path="/tournaments" isAuthenticated={this.state.isLoggedIn}>
                            <TournamentsPage/>
                        </PrivateRoute>
                        <PrivateRoute path="/teams" isAuthenticated={this.state.isLoggedIn}>
                            <TeamsPage/>
                        </PrivateRoute>
                    </Switch>
                </BrowserRouter>) :
                (
                    <div className="container">
                        <CircularProgress />
                    </div>
                )

        );
    }
}

export default App;
