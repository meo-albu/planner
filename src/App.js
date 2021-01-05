import React, { useEffect } from 'react';
import { Header } from './Components/Header/Header';
import { BrowserRouter as Router} from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from './Components/Loader'
import app from './Auth/firebase';
import {setUser} from './Store/actions/userActions'
import { setLoader, stopLoader } from './Store/actions/loaderActions';
import { Routes } from './Routes/Routes'

function App() {
  const theme = useSelector(state => state.themeReducer.theme)
  const loading = useSelector(state => state.loaderReducer.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoader())
    app.auth().onAuthStateChanged(user => {
      if(user) {
        const {displayName, email, photoURL} = user
        dispatch(setUser({
          username: displayName ? displayName : null,
          email,
          avatar: photoURL
        }))
        dispatch(stopLoader())
      }
      dispatch(stopLoader())
    })
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loader />}
      <Router>
        <Header />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;