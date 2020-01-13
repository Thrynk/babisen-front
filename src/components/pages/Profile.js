import React, { Fragment, Component } from "react";

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PersonPin from '@material-ui/icons/PersonPinOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

import NoProfilePicture from "../../facebook_no_profile.jpg";

export default class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {
            teams : null,
            loaded : false,
            matchesInfos: null
        };
    }

    componentDidMount() {
        /*fetch(process.env.REACT_APP_API_URL + '/api/teams/user', {method: 'GET', credentials: "include"}).then(r => {
            if(r.status === 200){
                r.json().then(teams => {
                    this.setState({teams, teamsLoaded: true});
                }).catch(e => {
                    console.log(e);
                })
            }
        });*/

        Promise.all([
            fetch(process.env.REACT_APP_API_URL + '/api/teams/user', {method: 'GET', credentials: "include"}), //user's teams
            fetch(process.env.REACT_APP_API_URL + '/api/matches/infos', {method: 'GET', credentials: "include"}), //user's matches
        ])
            .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()]);
            })
            .then(([teams, matchesInfos]) => {
                if(teams.length !== 0){
                    this.setState({teams, matchesInfos, loaded: true})
                }
                else{
                    this.setState({matchesInfos, loaded: true})
                }
            })
    }

    render(){

        const user = this.props.user;

        const firstTeamName = this.state.teams ? this.state.teams[0].name : null;

        const teamsLoaded = this.state.loaded ?
            (
                <div style={{color: "white"}}>
                    <Typography component="body1" gutterBottom>{firstTeamName}</Typography>
                </div>
            )
            : (<CircularProgress style={{color: 'white'}}/>);

        const matchesInfos = this.state.matchesInfos ? this.state.matchesInfos : null;

        const MatchesPlayed = matchesInfos ? matchesInfos.numberOfTotalMatches : null;

        const MatchesWon = matchesInfos ? matchesInfos.numberOfTotalMatchesWon : null;

        const MatchesLost = matchesInfos ? matchesInfos.numberOfTotalMatches - matchesInfos.numberOfTotalMatchesWon : null;

        return (
            <Fragment>
                <Grid container direction="column" style={{background: "#6200EE", height: "45vh"}}>
                    <Grid item style={{color: "white", textAlign: "center"}}>
                        <div style={{paddingTop: "10px"}}>
                            <PersonPin style={{transform: "translate(0, 30%)"}}/>
                            <Typography component="body1"> Profil</Typography>
                        </div>
                    </Grid>

                    <Grid item>
                        <Grid container justify="center" style={{padding: 10}}>
                            {user.imgUrl ?
                                (
                                    <Avatar alt="Profile picture" src={user.imgUrl} />
                                ) : (
                                    <Avatar alt="Profile picture" src={NoProfilePicture} style={{width: 160, height: 160}}/>
                                )
                            }
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container justify="center" style={{padding: 0}}>
                            <div style={{color: "white"}}>
                                <Typography component="body1" gutterBottom>
                                    {user.first_name && user.last_name ? this.props.user.first_name + " " + user.last_name : "Erreur"}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid container justify="center">
                            {teamsLoaded}
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container
                      spacing={0}
                      align="center"
                      justify="center"
                      direction="column"
                      style={{height: "calc(55vh - 56px)"}}
                >
                    <Grid item style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: "200px"}}>
                            {this.state.loaded ? (
                                <Grid container justify="center" direction="column">
                                    <Grid item>
                                        <Typography component="body1" gutterBottom>
                                            Joués : {MatchesPlayed}
                                        </Typography>
                                        <Divider component="hr" />
                                    </Grid>
                                    <Grid item>
                                        <Typography component="body1" gutterBottom>
                                            Gagnés : {MatchesWon}
                                        </Typography>
                                        <Divider component="hr" />
                                    </Grid>
                                    <Grid item>
                                        <Typography component="body1" gutterBottom>
                                            Perdus : {MatchesLost}
                                        </Typography>
                                    </Grid>
                                </Grid>)
                                :
                                (<CircularProgress />)
                            }
                    </Grid>
                </Grid>
            </Fragment>
        );
    }

}
