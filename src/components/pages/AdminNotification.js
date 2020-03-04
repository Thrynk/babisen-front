import React from "react";
import { FormControl, Button, Input, ListItem, List, ListItemText } from '@material-ui/core';

export default class AdminNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state={
                        notif:'',
                        listNotifications: []
                    };

        this.textInput = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        //fetch notifs
        fetch(process.env.REACT_APP_API_URL + '/api/notifications', {method: 'GET'})
            .then(response => response.json())
            .then(notifs => {
                this.setState({ listNotifications: notifs });
            })
            .catch(e => console.log(e));
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        /*let listNotifications = Array.from(this.state.listNotifications);
        listNotifications.push(this.state.notif);
        this.setState({ listNotifications: listNotifications });*/

        fetch(process.env.REACT_APP_API_URL + '/api/notifications/new',
            {method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({notification: this.state.notif, date: new Date()})})
            .then(response => {
                if(response.status === 200){
                    this.forceUpdate();
                }
            })
            .catch(e => console.log(e));
    }

    render(){
        return (
            <div align="center" style={{marginTop: 50}}>
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <Input name="notif" value={this.state.value} onChange={this.handleChange} inputRef={this.textInput} color='Secondary' />
                    <Button variant="contained" 
                            color="primary"
                            type="submit" 
                            onSubmit={this.handleSubmit}
                            >
                                Envoyer !
                    </Button>
                </FormControl>
            </form>
            
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
