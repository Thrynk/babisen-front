import React, {Fragment} from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ListOfAttendees(props){

    const classes = useStyles();

    return (
      <Fragment>
          <List className={classes.root}>
              { props.attendees !== undefined ? (
                    props.attendees.length !== 0 ? (
                        props.attendees.map(attendee => {

                            let name = props.isSolo ?
                                attendee.first_name + ' ' + attendee.last_name
                                :
                                attendee.name;

                            return (
                              <ListItem>
                                  <ListItemAvatar>
                                      <Avatar>
                                          <ImageIcon />
                                      </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary={name} />
                              </ListItem>
                            );
                        })
                    )
                    :
                    <div>Pas de participants</div>
                  )
                  :
                  <CircularProgress />
              }
          </List>
      </Fragment>
    );

}
