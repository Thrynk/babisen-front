import React, { useState } from "react";

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import Paper from '@material-ui/core/Paper';

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

import { DateTimePicker } from "@material-ui/pickers";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import TextField from '@material-ui/core/TextField';

import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
        marginTop: 10,
        marginBottom: 10,
        margin: "auto",
        maxWidth: "97%",
        "& form": {
            margin: "auto",
            maxWidth: "80%"
        }
    },
    title: {
        fontSize: 25,
        paddingTop: 15,
        textAlign: "center"
    },
    formControl: {
        width: "100%",
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        maxWidth: "70%"
    },
    button: {
        marginBottom: 20
    },
    buttonContainer: {
        textAlign: "center"
    }
});

export default function NewTournamentForm(props){

    const classes = useStyles();

    const [selectedStartDate, handleStartDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());
    const [selectedDoorTimeDate, handleDoorTimeDateChange] = useState(new Date());
    const [isSolo, setIsSolo] = React.useState("Duo");
    const [isAccessibleForFree, setIsAccessibleForFree] = React.useState("Gratuit");

    const handleChange = event => {
        setIsSolo(event.target.value);
    };

    const handleFreeChange = event => {
        setIsAccessibleForFree(event.target.value);
    };


    return (
        <Paper className={classes.root}>
            <form onSubmit={props.handleSubmit}>
                <Typography variant="h1" className={classes.title}>Création de tournoi</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name">Nom</InputLabel>
                    <Input
                        id="name"
                        value={props.name}
                        onChange={props.handleChange}
                        fullWidth
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input
                        id="description"
                        value={props.description}
                        onChange={props.handleChange}
                        fullWidth
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <DateTimePicker
                        autoOk
                        ampm={false}
                        disablePast
                        value={selectedStartDate}
                        onChange={handleStartDateChange}
                        label="Date de début"
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <DateTimePicker
                        autoOk
                        ampm={false}
                        disablePast
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                        label="Date de fin"
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <DateTimePicker
                        autoOk
                        ampm={false}
                        disablePast
                        value={selectedDoorTimeDate}
                        onChange={handleDoorTimeDateChange}
                        label="Date de fin d'inscription"
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={isSolo}
                        onChange={handleChange}
                    >
                        <MenuItem value={"Duo"}>Duo</MenuItem>
                        <MenuItem value={"Solo"}>Solo</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={isAccessibleForFree}
                        onChange={handleFreeChange}
                    >
                        <MenuItem value={"Gratuit"}>Gratuit</MenuItem>
                        <MenuItem value={"Payant"}>Payant</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <TextField
                        id="outlined-helperText"
                        label="Capacité maximale"
                        type="number"
                        defaultValue="20"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: 0
                        }}
                        variant="outlined"
                        min="0"
                    />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="image">Lien de l'image</InputLabel>
                    <Input
                        id="image"
                        value={props.imgUrl}
                        onChange={props.handleChange}
                        fullWidth
                    />
                </FormControl>
                <Container className={classes.buttonContainer}>
                    <Button className={classes.button} variant="outlined" color="primary" type="submit" onSubmit={props.handleSubmit}>
                        Créer
                    </Button>
                </Container>

            </form>
        </Paper>
    );
}




