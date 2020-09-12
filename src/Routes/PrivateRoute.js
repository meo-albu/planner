
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => {
    const loggedIn = useSelector(state => state.userReducer.loggedIn)

    return (
        <Route {...rest} render={props => (
          loggedIn ? <Component {...props} /> : <Redirect to="/login" />
        )} />
    );
};