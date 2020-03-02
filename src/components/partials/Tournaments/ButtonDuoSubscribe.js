import React, {Fragment} from "react";
import { Button, Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ButtonDuoSubscribe(props){
    return (
        <Fragment>
            <TeamDialogButton

                classes={props.classes}
            />
        </Fragment>
    );
}

const emails = ['username@gmail.com', 'user02@gmail.com'];

function TeamDialogButton(props){
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
        setSelectedValue(value);
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
            />
        </Fragment>
    );
}

function TeamDialog(props){
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Choix de l'équipe à inscrire</DialogTitle>
            <List>
                {emails.map(email => (
                    <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                        <ListItemText primary={email} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
