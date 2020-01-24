import React, {Component} from "react";

import NewTournamentForm from "./NewTournamentForm";

export default class NewTournament extends Component {
    constructor(props){
        super(props);
        this.state = {

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){

    }

    handleSubmit(event){
        console.log("submitted");
        event.preventDefault();
    }

    render(){
        return (
            <NewTournamentForm
                name={this.state.name}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}
