import React, { Fragment, Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import NextTournamentCard from "../partials/Tournaments/NextTournamentCard";
import CurrentTournamentCard from "../partials/Tournaments/CurrentTournamentCard";
import FinishedTournamentCard from "../partials/Tournaments/FinishedTournamentCard";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: '#6200EE'
    },
});

const actionTabsStyles = makeStyles({
    root : {
        color: 'rgba(255, 255, 255, 0.74) !important'
    },
    selected: {
        color: '#fff !important'
    }
});

const TabsStyles = makeStyles({
   root : {
       backgroundColor: '#fff'
   }
});

const TabPanelStyles = makeStyles({
   root: {
       marginBottom: 56
   }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function Tournaments(props){
    const classes = useStyles();
    const classesActionTabs = actionTabsStyles();
    const classesTabs = TabsStyles();
    const classesTabsPanel = TabPanelStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    classes={{ indicator: classesTabs.root }}
                >
                    <Tab label="Prochains" classes={{root: classesActionTabs.root, selected: classesActionTabs.selected}} />
                    <Tab label="En cours" classes={{root: classesActionTabs.root, selected: classesActionTabs.selected}} />
                    <Tab label="Terminés" classes={{root: classesActionTabs.root, selected: classesActionTabs.selected}} />
                </Tabs>
            </Paper>

            <TabPanel value={value} index={0} className={classesTabsPanel.root}>
                {
                    props.nextTournaments.length === 0 &&
                        <Grid container justify="center">
                            <Typography component="div">
                                Pas de tournoi.
                            </Typography>
                        </Grid>
                }
                {
                    props.nextTournaments.map(function(tournament, index){

                        let isSubscribedToTournament = tournament.attendees.find(attendee => {
                            return attendee === props.userId;
                        });

                        /*console.log(isSubscribedToTournament);
                        console.log(isSubscribedToTournament !== undefined);*/

                        return (
                            <NextTournamentCard
                                key={index}
                                name={tournament.name}
                                date={tournament.startDate}
                                maximumAttendeeCapacity={tournament.maximumAttendeeCapacity}
                                imgUrl={tournament.imgUrl}
                                id={tournament._id}
                                attendees={tournament.attendees}
                                attendeesNames={props.nextTournamentAttendees[tournament._id]}

                                isSubscribedToTournament={isSubscribedToTournament !== undefined}

                                subscribeUserToTournament={props.subscribeUserToTournament}
                                unsubscribeUserToTournament={props.unsubscribeUserToTournament}
                                fetchAttendees={props.fetchAttendees}
                            />
                        );
                    })
                }
            </TabPanel>
            <TabPanel value={value} index={1} className={classesTabsPanel.root}>
                {
                    props.currentTournaments.length === 0 &&
                        <Grid container justify="center">
                            <Typography component="div">
                                Pas de tournoi.
                            </Typography>
                        </Grid>
                }
                {
                    props.currentTournaments.map(function(tournament, index){
                        return (
                            <CurrentTournamentCard
                                key={index}
                                name={tournament.name}
                                date={tournament.startDate}
                                id={tournament._id}
                                maximumAttendeeCapacity={tournament.maximumAttendeeCapacity}
                                isSolo={tournament.isSolo}
                                attendees={tournament.attendees}
                                imgUrl={tournament.imgUrl}
                            />
                        );
                    })
                }
            </TabPanel>
            <TabPanel value={value} index={2} className={classesTabsPanel.root}>
                {
                    props.finishedTournaments.length === 0 &&
                        <Grid container justify="center">
                            <Typography component="div">
                                Pas de tournoi.
                            </Typography>
                        </Grid>
                }
                {
                    props.finishedTournaments.map(function(tournament, index){
                        return (
                            <FinishedTournamentCard
                                key={index}
                                name={tournament.name}
                                date={tournament.startDate}
                                maximumAttendeeCapacity={tournament.maximumAttendeeCapacity}
                                attendees={tournament.attendees}
                                imgUrl={tournament.imgUrl}
                            />
                        );
                    })
                }
            </TabPanel>
        </div>
    );
}

export default class TournamentsPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            nextTournaments: [],
            currentTournaments: [],
            finishedTournaments: [],
            nextTournamentAttendees: []
        };
        this.subscribeUserToTournament = this.subscribeUserToTournament.bind(this);
        this.unsubscribeUserToTournament = this.unsubscribeUserToTournament.bind(this);
        this.fetchAttendeesOfTournament = this.fetchAttendeesOfTournament.bind(this);
    }

    componentDidMount() {
        Promise.all([
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/next', {method: 'GET', credentials: "include"}), // next tournaments
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/current', {method: 'GET', credentials: "include"}), // current tournaments
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/finished', {method:'GET', credentials: "include"})
        ])
            .then(([next, current, finished]) => {
                let responses = [];

                switch(next.status){
                    case 200:
                        responses.push(next.json());
                        break;
                    case 204:
                        responses.push(Promise.resolve([]));
                        break;
                    default:
                        responses.push(Promise.reject());
                }

                switch(current.status){
                    case 200:
                        responses.push(current.json());
                        break;
                    case 204:
                        responses.push(Promise.resolve([]));
                        break;
                    default:
                        responses.push(Promise.reject());
                }

                switch(finished.status){
                    case 200:
                        responses.push(finished.json());
                        break;
                    case 204:
                        responses.push(Promise.resolve([]));
                        break;
                    default:
                        responses.push(Promise.reject());
                }

                return Promise.all(responses);

            })
            .then(([next, current, finished]) => {
                /*console.log(next);
                console.log(current);
                console.log(finished);*/
                this.setState({nextTournaments: next, currentTournaments: current, finishedTournaments: finished});
            })
            .catch(error => console.log(error));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        Promise.all([
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/next', {method: 'GET', credentials: "include"}), // next tournaments
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/current', {method: 'GET', credentials: "include"}), // current tournaments
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/finished', {method:'GET', credentials: "include"})
        ])
            .then(([next, current, finished]) => {
                let responses = [];

                switch(next.status){
                    case 200:
                        responses.push(next.json());
                        break;
                    case 204:
                        responses.push(Promise.resolve([]));
                        break;
                    default:
                        responses.push(Promise.reject());
                }

                switch(current.status){
                    case 200:
                        responses.push(current.json());
                        break;
                    case 204:
                        responses.push(Promise.resolve([]));
                        break;
                    default:
                        responses.push(Promise.reject());
                }

                switch(finished.status){
                    case 200:
                        responses.push(finished.json());
                        break;
                    case 204:
                        responses.push(Promise.resolve([]));
                        break;
                    default:
                        responses.push(Promise.reject());
                }

                return Promise.all(responses);

            })
            .then(([next, current, finished]) => {
                /*console.log(next);
                console.log(current);
                console.log(finished);*/
                this.setState({nextTournaments: next, currentTournaments: current, finishedTournaments: finished});
            })
            .catch(error => console.log(error));
    }

    subscribeUserToTournament(tournamentId){
        console.log("suscribe : ", this.props.userId, " to ", tournamentId);
        fetch(process.env.REACT_APP_API_URL + '/api/tournaments/attendee/add/' + tournamentId,
            {
                    method:'PUT',
                    credentials: "include",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ attendee: this.props.userId })
                }
            )
            .then(response => {
                if(response.status === 200){
                    this.forceUpdate();
                }
            })
            .catch(error => console.log(error));
    }

    unsubscribeUserToTournament(tournamentId){
        console.log("unsuscribe : ", this.props.userId, " to ", tournamentId);
        fetch(process.env.REACT_APP_API_URL + '/api/tournaments/attendee/remove/' + tournamentId,
        {
                method:'PUT',
                credentials: "include",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ attendee: this.props.userId })
            }
        )
            .then(response => {
                if(response.status === 200){
                    this.forceUpdate();
                }
            })
            .catch(error => console.log(error));
    }

    fetchAttendeesOfTournament(tournamentId){
        fetch(process.env.REACT_APP_API_URL + '/api/tournaments/attendees/' + tournamentId,
        {
                method: 'GET',
                credentials: "include"
            }
        )
            .then(response => response.json())
            .then(attendees => {
                let nextTournamentAttendees = this.state.nextTournamentAttendees;
                nextTournamentAttendees[tournamentId] = attendees;
                console.log(nextTournamentAttendees);
                this.setState({nextTournamentAttendees: nextTournamentAttendees});
            })
            .catch(e => console.log(e));
    }

    render(){
        return(
          <Fragment>
            <Tournaments
                nextTournaments={this.state.nextTournaments}
                currentTournaments={this.state.currentTournaments}
                finishedTournaments={this.state.finishedTournaments}
                userId={this.props.userId}
                nextTournamentAttendees={this.state.nextTournamentAttendees}

                subscribeUserToTournament={this.subscribeUserToTournament}
                unsubscribeUserToTournament={this.unsubscribeUserToTournament}
                fetchAttendees={this.fetchAttendeesOfTournament}
            />
          </Fragment>
        );
    }
}
