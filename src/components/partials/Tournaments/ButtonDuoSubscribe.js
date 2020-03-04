import React, {Fragment} from "react";
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default class ButtonDuoSubscribe extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            teams: []
        };
    }

    componentDidMount() {
        //fetch user's teams
        fetch(process.env.REACT_APP_API_URL + '/api/teams/user', {method: 'GET', credentials: "include"})
            .then(response => response.json())
            .then(teams => {
                /*console.log(teams);*/
                this.setState({ teams: teams });
            })
            .catch(e => console.log(e));

        console.log(this.props.isSubscribedToTournament);
    }

    render() {
        return (
            <Fragment>
                <TeamDialogButton
                    classes={this.props.classes}
                    teams={this.state.teams}

                    id={this.props.id}

                    isSubscribedToTournament={this.props.isSubscribedToTournament}

                    subscribeTeamToTournament={this.props.subscribeTeamToTournament}
                    unsubscribeTeamToTournament={this.props.unsubscribeTeamToTournament}
                />
            </Fragment>
        );
    }
}

function TeamDialogButton(props){
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = teamId => {
        setOpen(false);
        console.log(teamId);
        if (teamId !== "") {
            if (props.isSubscribedToTournament) {
                props.unsubscribeTeamToTournament(props.id, teamId);
            } else {
                setSelectedValue(teamId);
                props.subscribeTeamToTournament(props.id, teamId);
            }
        }
    };

    return(
        <Fragment>
            <Button
                aria-label={"subscribe"}
                className={props.classes}
                startIcon={props.isSubscribedToTournament ? <DeleteIcon /> : <AddIcon />}
                onClick={handleClickOpen}
            >
                { props.isSubscribedToTournament ? "Se désinscrire" : "S'inscrire" }
            </Button>
            <TeamDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                teams={props.teams}
            />
        </Fragment>
    );
}

function TeamDialog(props){
    const { onClose, open } = props;

    const handleClose = () => {
        onClose("");
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Choix de l'équipe à inscrire</DialogTitle>
            <List>
                {props.teams.map(team => (
                    <ListItem button onClick={() => handleListItemClick(team._id)} key={team._id}>
                        <ListItemText primary={team.name} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
