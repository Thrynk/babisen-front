import React, { Fragment } from "react";

export default function Profile(props){


    return (
        <Fragment>
            <div>
                {props.user ? "Yes" : "No"}
            </div>
        </Fragment>
    );
}
