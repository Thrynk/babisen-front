import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ButtonSoloSubscribe(props){
    return (
        <Fragment>
            <Button
                aria-label={"subscribe"}
                className={props.classes}
                startIcon={props.isSubscribedToTournament ? <DeleteIcon /> : <AddIcon />}
                onClick={
                    props.isSubscribedToTournament ?
                        () => props.unsubscribeUserToTournament(props.id)
                        : () => props.subscribeUserToTournament(props.id)
                }
            >
                { props.isSubscribedToTournament ? "Se désinscrire" : "S'inscrire" }
            </Button>
        </Fragment>
    );
}
