import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateAdminRoute({ children, ...rest}) {

    return (
        <Route
            {...rest}
            render={({ location }) =>
                rest.isAuthenticated && rest.isAdmin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
