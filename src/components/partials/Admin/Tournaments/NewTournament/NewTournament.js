import React, {Component} from "react";

import NewTournamentForm from "./NewTournamentForm";

export default class NewTournament extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            doorTime: new Date(),
            isSolo: false,
            isAccessibleForFree: true,
            maximumAttendeeCapacity: 20,
            imgUrl: '',

            formErrors: {
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                doorTime: '',
                isSolo: '',
                isAccessibleForFree: '',
                maximumAttendeeCapacity: '',
                imgUrl: ''
            },

            validation : {
                nameValid: false,
                descriptionValid: false,
                startDateValid: false,
                endDateValid: false,
                doorTimeValid: false,
                isSoloValid: false,
                isAccessibleForFreeValid: false,
                maximumAttendeeCapacityValid: false,
                imgUrlValid: false
            },

            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleDoorTimeDateChange = this.handleDoorTimeDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        let name = event.target.name;
        let value = event.target.value;

        //console.log(name, value);

        switch(name){

            case 'isSolo':
                value = value !== "Duo";
                break;

            case 'isAccessibleForFree':
                console.log(value !== "Payant");
                value = value !== "Payant";
                break;

            case 'maximumAttendeeCapacity':
                value = parseInt(value);
                break;

            default:
                break;
        }
        this.setState({[name]: value});
    };

    handleStartDateChange = date => {
        this.setState({startDate: date});
    };

    handleEndDateChange = date => {
        this.setState({endDate: date});
    };

    handleDoorTimeDateChange = date => {
        this.setState({doorTime: date});
    };

    handleSubmit = event => {
        console.log("submitted");
        event.preventDefault();
        let submitBody = Object.assign({}, this.state);
        delete submitBody['validation'];
        delete submitBody['formErrors'];
        delete submitBody['isLoading'];
        console.log(submitBody);
        this.setState({isLoading: true});
        fetch(process.env.REACT_APP_API_URL + '/api/tournaments',
            {
                    headers: {
                      'Content-type': 'application/json'
                    },
                    method: 'POST',
                    credentials: "include",
                    body: JSON.stringify(submitBody)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({isLoading: false});
            })
            .catch(error => {
                console.log(error);
            });
    };

    render(){
        return (
            <NewTournamentForm
                name={this.state.name}
                description={this.state.description}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                doorTime={this.state.doorTime}
                isSolo={this.state.isSolo}
                isAccessibleForFree={this.state.isAccessibleForFree}
                maximumAttendeeCapacity={this.state.maximumAttendeeCapacity}
                imgUrl={this.state.imgUrl}

                isLoading={this.state.isLoading}

                handleChange={this.handleChange}
                handleStartDateChange={this.handleStartDateChange}
                handleEndDateChange={this.handleEndDateChange}
                handleDoorTimeDateChange={this.handleDoorTimeDateChange}
                handleSubmit={this.handleSubmit}

                formErrors={this.state.formErrors}
                validation={this.state.validation}
            />
        );
    }
}
