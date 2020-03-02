import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";

import PrivateRoute from './components/helpers/PrivateRoute';
import PrivateAdminRoute from './components/helpers/PrivateAdminRoute';

import LoginPage from "./components/pages/Login";
import ProfilePage from "./components/pages/Profile";
import TeamsPage from "./components/pages/Teams";
import TournamentsPage from "./components/pages/Tournaments";
import AdminPage from "./components/pages/Admin";
import AdminNotification from "./components/pages/AdminNotification";

import BottomNav from "./components/partials/BottomNav";

import CircularProgress from '@material-ui/core/CircularProgress';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
                    //console.log(user);
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
        this.setState({isLoaded: false});
        //console.log(response);
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            credentials: "include"
        };
        fetch(process.env.REACT_APP_API_URL + '/api/auth/facebook', options).then(r => {
            r.json().then(user => {
                //console.log(user);
                this.setState({isLoggedIn: true, user, isLoaded: true});
            });
        })
    }

    render(){

        const isUserAdmin = this.state.user ? this.state.user.role === "admin" : false;

        const userId = this.state.user ? this.state.user._id : null;

        return (
            this.state.isLoaded ?
                (<MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <BrowserRouter>
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
                                <TournamentsPage userId={userId} />
                            </PrivateRoute>
                            <PrivateRoute path="/teams" isAuthenticated={this.state.isLoggedIn}>
                                <TeamsPage/>
                            </PrivateRoute>
                            <PrivateAdminRoute path="/admin" isAuthenticated={this.state.isLoggedIn} isAdmin={isUserAdmin}>
                                <AdminPage />
                            </PrivateAdminRoute>
                            <PrivateAdminRoute path="/notifications" isAuthenticated={this.state.isLoggedIn} isAdmin={isUserAdmin}>
                                <AdminNotification />
                            </PrivateAdminRoute>
                        </Switch>
                    </BrowserRouter>
                </MuiPickersUtilsProvider>) :
                (
                    <div className="container">
                        <CircularProgress />
                    </div>
                )

        );
    }
}

export default App;
