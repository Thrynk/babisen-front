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

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let listNotifications = Array.from(this.state.listNotifications);
        listNotifications.push(this.state.notif);
        this.setState({ listNotifications: listNotifications });
    }

    render(){
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <FormControl>
                    <Input name="notif" value={this.state.value} onChange={this.handleChange} inputRef={this.textInput}></Input>
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
                            <ListItemText>{notif}</ListItemText>
                        </ListItem>
                    );
                })}
            </List>

            </div>
        );
    }
}

/*class CustomInput extends Input {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Input
                name={this.props.name}
                value={this.props.value} 
                onChange={this.props.onChange}
                inputRef={this.props.inputRef}
            ></Input>
        );
    }
}*/