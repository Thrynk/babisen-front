import React, { Fragment, Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
                    props.tournaments.map(function(tournament){
                        return (
                            <TournamentCard
                                name={tournament.name}
                                date={tournament.date}
                                maximumAttendeeCapacity={tournament.maximumAttendeeCapacity}
                                remainingAttendeeCapacity={tournament.remainingAttendeeCapacity}
                                imgUrl={tournament.imgUrl}
                            />
                        );
                    })
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
    );
}

export default class TournamentsPage extends Component {

    constructor(props){
        super(props);
        this.state = {
          tournaments: [
              {
                  name: "Afterwork PDD",
                  date: "26/10/2020 - 18h",
                  maximumAttendeeCapacity: 40,
                  remainingAttendeeCapacity: 29,
                  imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQloN9rm3GTpWAW6AodU_ofeADoU7RDR0heHbXaapD6FwZ1mA8VzQ&s"
              }
          ]
        };
    }

    render(){
        return(
          <Fragment>
            <Tournaments tournaments={this.state.tournaments} />
          </Fragment>
        );
    }
}
