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
import PlayIcon from '@material-ui/icons/PlayArrowOutlined';
import defaultImage from "../../../logo.jpeg";
import {Link} from "react-router-dom";

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
        containedPrimary: '#6200EE'
    },
    cardActions: {
        justifyContent: "center"
    }
}));

export default function NextTournamentCard(props) {
    const classes = useStyles();

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
                    Participants : {props.attendees.length}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Commencé depuis :
                </Typography>
            </CardContent>
            <CardActions disableSpacing classes={{root: classes.cardActions}}>
                <Link to="/directnotifications">
                    <Button
                        variant="contained"
                        color="primary"
                        aria-label={"See scores"}
                        className={classes.buttons}
                        startIcon={<PlayIcon />}
                        //onClick={}
                    >
                        Direct
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
