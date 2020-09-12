import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { Main } from '../Main/Main'
import { Login } from '../Auth/Login'
import { Signup } from '../Auth/Signup'

export const Routes = () => {

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute exact path="/" component={Main} />
      </Switch>
    </>
  )
}