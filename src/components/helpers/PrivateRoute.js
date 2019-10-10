import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ children, ...rest }) {
    let isAuthenticated = true;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
