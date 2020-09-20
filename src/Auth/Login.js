import React, { useState } from 'react';
import app from './firebase'
import * as firebase from 'firebase/app'
import { UiContainer } from './UiContainer';
import { useDispatch, useSelector } from 'react-redux';
import {setLoader, stopLoader} from '../Store/actions/loaderActions'
import styled from 'styled-components';
import { loginUser } from '../Store/actions/userActions';
import { Redirect } from 'react-router-dom';
import { Loader } from '../Components/Loader';

export const Login = () => {
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const loading = useSelector(state => state.loaderReducer.loading)
  const [error, setError] = useState({
    code: null,
    message: null
  })
  const dispatch = useDispatch()
  
  const loginWithGoogle = () => {
    setError({code: null, message: null})
    const provider = new firebase.auth.GoogleAuthProvider();
    dispatch(setLoader())

    app.auth().signInWithPopup(provider)
    .then((user) => {
      if(user) {
        console.log(user)
        localStorage.setItem('access_token', user.credential.accessToken)
        const {displayName, email, photoURL} = user
        dispatch(loginUser({
          username: displayName,
          email,
          avatar: photoURL
        }))
      }
      dispatch(loginUser({

      }))
      dispatch(stopLoader())
    }).catch((error) => {
      setError({
        code: error.code,
        message: error.message
      })
      dispatch(stopLoader())
    });
  }
  
  const loginWithEmailAndPassword = e => {
    e.preventDefault()
    dispatch(setLoader())
    setError({code: null, message: null})

    const [email, password] = e.target.elements

    app.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((user) => {
      if(user) {
        const {displayName, email, photoURL} = user
        dispatch(loginUser({
          username: displayName,
          email,
          avatar: photoURL
        }))
      }
      dispatch(stopLoader())
    })
    .catch(function(error) {
      setError({
        code: error.code,
        message: error.message
      })
      dispatch(stopLoader())
    });
  }

  if(loading) {
    return <Loader />
  }

  return (
    <UiContainer>
      {loggedIn && <Redirect to="/" />}
      <h3>Login</h3>
      <form onSubmit={loginWithEmailAndPassword}>
        <div className="email">
          <svg width="15" height="14.204" viewBox="0 0 21.042 14.204">
            <path id="email" d="M.072,17.014V5.326q0-.02.061-.386l6.879,5.884L.153,17.419a1.72,1.72,0,0,1-.081-.406ZM.985,4.129a.874.874,0,0,1,.345-.061H19.856a1.149,1.149,0,0,1,.365.061l-6.9,5.9-.913.73L10.6,12.245,8.8,10.764l-.913-.73Zm.02,14.082,6.919-6.635L10.6,13.747l2.678-2.171L20.2,18.211a.974.974,0,0,1-.345.061H1.33a.919.919,0,0,1-.325-.061Zm13.189-7.386,6.858-5.884a1.211,1.211,0,0,1,.061.386V17.014a1.555,1.555,0,0,1-.061.406Z" transform="translate(-0.072 -4.068)" fill="#0068b8"/>
          </svg>
          <input type="email" name="email" placeholder="email" />
          <label htmlFor="email">email</label>
        </div>
        <div className="password">
          <svg width="13.978" height="15" viewBox="0 0 13.978 18.172">
            <path id="password" d="M18.981,9.665H17.932V7.625a4.194,4.194,0,1,0-8.387-.057v2.1H8.5A1.752,1.752,0,0,0,6.75,11.412V19.8A1.752,1.752,0,0,0,8.5,21.546H18.981A1.752,1.752,0,0,0,20.728,19.8V11.412A1.752,1.752,0,0,0,18.981,9.665Zm-4.63,5.451v3.005a.626.626,0,0,1-.581.629.612.612,0,0,1-.642-.612V15.116a1.4,1.4,0,1,1,1.223,0Zm2.359-5.451H10.769v-2.1a2.97,2.97,0,0,1,5.941,0Z" transform="translate(-6.75 -3.374)" fill="#0068b8"/>
          </svg>
          <input type="password" name="password" placeholder="password" />
          <label htmlFor="password">password</label>
        </div>
        <ErrorMessage err={error.message}>{error.message}</ErrorMessage>
        <div className="flex">
          <input type="submit" value="Login" />
          
          <button type="button" onClick={loginWithGoogle} className="google">

            <svg xmlns="http://www.w3.org/2000/svg" width="17.649" height="17.938" viewBox="0 0 17.649 17.938">
              <g id="Group_6" data-name="Group 6" transform="translate(-1120.413 -674.469)">
                <path id="Icon_awesome-google" data-name="Icon awesome-google" d="M17.649,9.741c0,5.117-3.5,8.759-8.68,8.759a8.969,8.969,0,1,1,0-17.938A8.625,8.625,0,0,1,14.983,2.91L12.542,5.257C9.349,2.175,3.41,4.49,3.41,9.531a5.618,5.618,0,0,0,5.559,5.663,4.85,4.85,0,0,0,5.092-3.866H8.969V8.244h8.539A7.863,7.863,0,0,1,17.649,9.741Z" transform="translate(1120.413 673.906)" fill="#db4437"/>
              </g>
            </svg>
            <span>Login with Google</span>
          </button>
        </div>
      </form>
    </UiContainer>
  );
}

const ErrorMessage = styled.span`
  font-size: 9px;
  color: red;
  padding: 5px;
  background: rgba(255, 0, 0, 0.05);
  display: block;
  opacity: ${({err}) => err ? 1 : 0};
  scale: ${({err}) => err ? 1 : 0};
  margin: 20px 0;
  transition: 0.5s;
`