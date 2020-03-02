import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
//import Avatar from '@material-ui/core/Avatar';
//import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
//import ShareIcon from '@material-ui/icons/Share';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import Collapse from '@material-ui/core/Collapse';

import ListOfAttendees from "./ListOfAttendees";
import ButtonSoloSubscribe from "./ButtonSoloSubscribe";

import defaultImage from "../../../logo.jpeg";

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: 345,
        margin: 'auto',
        marginBottom: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    buttons: {
        color: '#6200EE'
    }
}));

export default function NextTournamentCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        if(!expanded){
            props.fetchAttendees(props.id);
        }
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                /*avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }*/
                /*action={
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                }*/
                title={props.name}
                subheader={props.date}
            />
            <CardMedia
                className={classes.media}
                image={props.imgUrl ? props.imgUrl : defaultImage}
                title="Image tournoi"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Capacité : {props.maximumAttendeeCapacity}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Places restantes : {props.maximumAttendeeCapacity - props.attendees.length}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {
                    props.isSolo ?
                        <ButtonSoloSubscribe
                            subscribeUserToTournament={props.subscribeUserToTournament}
                            unsubscribeUserToTournament={props.unsubscribeUserToTournament}
                            id={props.id}
                            isSubscribedToTournament={props.isSubscribedToTournament}
                            classes={classes.buttons}
                        />
                        :
                        <div>Duo</div>
                }

                <Button
                    aria-label="See more"
                    className={classes.buttons}
                    startIcon={<ErrorOutlineIcon />}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                >
                    Participants
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <ListOfAttendees attendees={props.attendeesNames} />
                </CardContent>
            </Collapse>
        </Card>
    );
}
