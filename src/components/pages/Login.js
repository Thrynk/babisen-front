import React from "react";
import { Redirect } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import logo from '../../logo.jpeg';

import './Login.css';

const useStyles = makeStyles({
    avatar: {
        margin: 'auto',
        width: '65%',
        height: 'auto'
    },
    facebookButton: {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center'
    },
    contentContainer: {
        height: '100%'
    }
});

function Login(props){

    const classes = useStyles();

    return (
        <div className="mainContainer">
            {props.isLoggedIn ? (
                    <Redirect to="/profile"/>
                ) :
                (
                    <Grid container justify="center" alignItems="center" className={classes.contentContainer}>
                        <Grid item xs={12}>
                            <Avatar alt="Logo" src={logo} className={classes.avatar} />
                        </Grid>
                        <Grid item xs={12}>
                            <Container className={classes.facebookButton}>
                                <FacebookLogin
                                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={props.facebookResponse}
                                />
                            </Container>
                        </Grid>
                    </Grid>

                )
            }
        </div>
    )
}

export default Login;
