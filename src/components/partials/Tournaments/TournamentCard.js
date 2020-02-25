import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: 345,
        margin: 'auto'
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

export default function TournamentCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                }
                title={props.name}
                subheader={props.date}
            />
            <CardMedia
                className={classes.media}
                image={props.imgUrl}
                title="Image tournoi"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Capacité : {props.maximumAttendeeCapacity}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Places restantes : {props.remainingAttendeeCapacity}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button
                    aria-label="subscribe"
                    className={classes.buttons}
                    startIcon={<AddIcon />}
                >
                    S'inscrire
                </Button>
                <Button
                    aria-label="See more"
                    className={classes.buttons}
                    startIcon={<ErrorOutlineIcon />}
                >
                    Voir plus
                </Button>
            </CardActions>
        </Card>
    );
}
