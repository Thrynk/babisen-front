import React from "react";
import {List, ListItem, ListItemText} from "@material-ui/core";

export default class DirectNotifications extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            listNotifications: []
        }
    }

    componentDidMount() {
        //fetch notifs
        fetch(process.env.REACT_APP_API_URL + '/api/notifications', {method: 'GET'})
            .then(response => response.json())
            .then(notifs => {
                this.setState({ listNotifications: notifs });
            })
            .catch(e => console.log(e));
    }

    render() {
        return(
            <div>
                <List>
                    {this.state.listNotifications.map((notif, index) => {
                        return(
                            <ListItem key={index}>
                                <ListItemText>{notif.notification}</ListItemText>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}
