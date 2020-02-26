import React, { Fragment, Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import TournamentCard from "../partials/Tournaments/TournamentCard";

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

            <TabPanel value={value} index={0}>
                {
                    props.nextTournaments.length === 0 &&
                        <Grid container justify="center">
                            <Typography component="body1">
                                Pas de tournoi.
                            </Typography>
                        </Grid>
                }
                {
                    props.nextTournaments.map(function(tournament){
                        return (
                            <TournamentCard
                                name={tournament.name}
                                date={tournament.startDate}
                                maximumAttendeeCapacity={tournament.maximumAttendeeCapacity}
                                remainingAttendeeCapacity={tournament.remainingAttendeeCapacity ? tournament.remainingAttendeeCapacity : tournament.maximumAttendeeCapacity}
                                imgUrl={tournament.imgUrl}
                            />
                        );
                    })
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    props.currentTournaments.length === 0 &&
                        <Grid container justify="center">
                            <Typography component="body1">
                                Pas de tournoi.
                            </Typography>
                        </Grid>
                }
                {
                    props.currentTournaments.map(function(tournament){
                        return (
                            <TournamentCard
                                name={tournament.name}
                                date={tournament.startDate}
                                maximumAttendeeCapacity={tournament.maximumAttendeeCapacity}
                                remainingAttendeeCapacity={tournament.remainingAttendeeCapacity ? tournament.remainingAttendeeCapacity : tournament.maximumAttendeeCapacity}
                                imgUrl={tournament.imgUrl}
                            />
                        );
                    })
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                {
                    props.finishedTournaments.length === 0 &&
                        <Grid container justify="center">
                            <Typography component="body1">
                                Pas de tournoi.
                            </Typography>
                        </Grid>
                }
                {
                    props.finishedTournaments.map(function(tournament){
                        return (
                            <TournamentCard
                                name={tournament.name}
                                date={tournament.startDate}
                                maximumAttendeeCapacity={tournament.maximumAttendeeCapacity}
                                remainingAttendeeCapacity={tournament.remainingAttendeeCapacity ? tournament.remainingAttendeeCapacity : tournament.maximumAttendeeCapacity}
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
            finishedTournaments: []
        };
    }

    componentDidMount() {
        Promise.all([
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/next', {method: 'GET', credentials: "include"}), // next tournaments
            fetch(process.env.REACT_APP_API_URL + '/api/tournaments/current', {method: 'GET', credentials: "include"})
        ])
            .then(([next, current]) => {
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

                return Promise.all(responses);

            })
            .then(([next, current]) => {
                console.log(next);
                console.log(current);
                this.setState({nextTournaments: next, currentTournaments: current});
            })
            .catch(error => console.log(error));
    }

    render(){
        return(
          <Fragment>
            <Tournaments
                nextTournaments={this.state.nextTournaments}
                currentTournaments={this.state.currentTournaments}
                finishedTournaments={this.state.finishedTournaments}
            />
          </Fragment>
        );
    }
}
