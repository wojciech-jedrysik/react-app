import React from 'react';
import { Route, Redirect } from "react-router-dom";

const BasicRoute = ({ component: Component, authed, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
)} />
);
}

export default BasicRoute;
