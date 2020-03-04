import React, {Fragment} from "react";

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

import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    root: {
        marginTop: 10,
        marginBottom: 10,
        margin: "auto",
        maxWidth: "97%",
        "& form": {
            margin: "auto",
            maxWidth: "80%"
        },
        height: "82vh"
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
    },
    form : {
        height: "100%"
    },
    loadingContainer: {
        height: "90%"
    }
});

export default function NewTournamentForm(props){

    const classes = useStyles();

    return (
        <div>
        <Paper className={classes.root}>
            <form onSubmit={props.handleSubmit} className={classes.form}>
                <Typography variant="h1" className={classes.title}>Création de tournoi</Typography>
                {
                    !props.isLoading ? (
                        <Fragment>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="name">Nom</InputLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    value={props.name}
                                    onChange={props.handleChange}
                                    /*onBlur={() => console.log("exit field")}*/
                                    fullWidth
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Input
                                    id="description"
                                    name="description"
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
                                    value={props.startDate}
                                    onChange={props.handleStartDateChange}
                                    label="Date de début"
                                    inputProps={{
                                        name: "startDate"
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <DateTimePicker
                                    autoOk
                                    ampm={false}
                                    disablePast
                                    value={props.endDate}
                                    onChange={props.handleEndDateChange}
                                    label="Date de fin"
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <DateTimePicker
                                    autoOk
                                    ampm={false}
                                    disablePast
                                    value={props.doorTime}
                                    onChange={props.handleDoorTimeDateChange}
                                    label="Date de fin d'inscription"
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={props.isSolo ? "Solo" : "Duo"}
                                    inputProps={{
                                        name: "isSolo"
                                    }}
                                    onChange={props.handleChange}
                                >
                                    <MenuItem value={"Duo"}>Duo</MenuItem>
                                    <MenuItem value={"Solo"}>Solo</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={props.isAccessibleForFree ? "Gratuit" : "Payant"}
                                    inputProps={{
                                        name: "isAccessibleForFree"
                                    }}
                                    onChange={props.handleChange}
                                >
                                    <MenuItem value={"Gratuit"}>Gratuit</MenuItem>
                                    <MenuItem value={"Payant"}>Payant</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    id="outlined-helperText"
                                    name="maximumAttendeeCapacity"
                                    onChange={props.handleChange}
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
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="image">Lien de l'image</InputLabel>
                                <Input
                                    id="image"
                                    name="imgUrl"
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
                        </Fragment>
                    ) :
                    (
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            className={classes.loadingContainer}
                        >
                                <CircularProgress />
                        </Grid>
                    )
                }
            </form>
        </Paper>
        </div>
    );
}




