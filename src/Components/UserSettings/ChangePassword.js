import React, { useState } from 'react'
import styled from 'styled-components'
import app from '../../Auth/firebase'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { useSelector } from 'react-redux'

export const ChangePassword = (props) => {
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const [error, setError] = useState({
    code: null,
    message: null
  })

  const changePassword = e => {
    e.preventDefault()

    const {currentPassword, newPassword, confirmPassword} = e.target.elements

    const reauthenticate = (currentPassword) => {
      const user = app.auth().currentUser;
      const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
      return user.reauthenticateWithCredential(credentials);
    }

    if(currentPassword.value !== '' && newPassword.value !== '' && confirmPassword.value !== '') {
      if(newPassword.value === confirmPassword.value) {
        setError({code: null, message: null})

        reauthenticate(currentPassword.value).then(() => {
          app.auth().currentUser.updatePassword(newPassword.value).then(() => {
              currentPassword.value = ''
              newPassword.value = ''
              confirmPassword.value = ''
          }).catch(error => setError({code: error.code, message: error.message}))
        }).catch(error => setError({code: error.code, message: error.message}))

      } else {
        setError({
          code: 'auth/wrong-password',
          message: "New password doesn't match the confirm password."
        })
      }
    } else {
      setError({
        code: 'auth/wrong-password',
        message: 'All fields are required.'
      })
    }
  }

  return (
    <Container isOpen={props.isOpen} darkTheme={darkTheme}>
      <strong>Change Password</strong>
      <form onSubmit={changePassword}>
        <div className="password">
          <svg width="13.978" height="15" viewBox="0 0 13.978 18.172">
            <path id="password" d="M18.981,9.665H17.932V7.625a4.194,4.194,0,1,0-8.387-.057v2.1H8.5A1.752,1.752,0,0,0,6.75,11.412V19.8A1.752,1.752,0,0,0,8.5,21.546H18.981A1.752,1.752,0,0,0,20.728,19.8V11.412A1.752,1.752,0,0,0,18.981,9.665Zm-4.63,5.451v3.005a.626.626,0,0,1-.581.629.612.612,0,0,1-.642-.612V15.116a1.4,1.4,0,1,1,1.223,0Zm2.359-5.451H10.769v-2.1a2.97,2.97,0,0,1,5.941,0Z" transform="translate(-6.75 -3.374)" fill="#0068b8"/>
          </svg>
          <input type="password" name="currentPassword" placeholder="current password" />
          <label htmlFor="password">current password</label>
        </div>
        <div className="password">
          <svg width="13.978" height="15" viewBox="0 0 13.978 18.172">
            <path id="password" d="M18.981,9.665H17.932V7.625a4.194,4.194,0,1,0-8.387-.057v2.1H8.5A1.752,1.752,0,0,0,6.75,11.412V19.8A1.752,1.752,0,0,0,8.5,21.546H18.981A1.752,1.752,0,0,0,20.728,19.8V11.412A1.752,1.752,0,0,0,18.981,9.665Zm-4.63,5.451v3.005a.626.626,0,0,1-.581.629.612.612,0,0,1-.642-.612V15.116a1.4,1.4,0,1,1,1.223,0Zm2.359-5.451H10.769v-2.1a2.97,2.97,0,0,1,5.941,0Z" transform="translate(-6.75 -3.374)" fill="#0068b8"/>
          </svg>
          <input type="password" name="newPassword" placeholder="new password" />
          <label htmlFor="password">new password</label>
        </div>
        <div className="password">
          <svg width="13.978" height="15" viewBox="0 0 13.978 18.172">
            <path id="password" d="M18.981,9.665H17.932V7.625a4.194,4.194,0,1,0-8.387-.057v2.1H8.5A1.752,1.752,0,0,0,6.75,11.412V19.8A1.752,1.752,0,0,0,8.5,21.546H18.981A1.752,1.752,0,0,0,20.728,19.8V11.412A1.752,1.752,0,0,0,18.981,9.665Zm-4.63,5.451v3.005a.626.626,0,0,1-.581.629.612.612,0,0,1-.642-.612V15.116a1.4,1.4,0,1,1,1.223,0Zm2.359-5.451H10.769v-2.1a2.97,2.97,0,0,1,5.941,0Z" transform="translate(-6.75 -3.374)" fill="#0068b8"/>
          </svg>
          <input type="password" name="confirmPassword" placeholder="confirm password" />
          <label htmlFor="password">confirm password</label>
        </div>
        <ErrorMessage err={error.message}>{error.message}</ErrorMessage>
        <Button type='submit'>Submit</Button>
        <button type='button' className="cancel" onClick={() => props.setChangePass(false)}>Cancel</button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 70px;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 30px 10px;
  background: ${({theme}) => theme.background};

  form {
    margin-top: 25px;

    button:focus {
      outline: 0;
    }

    .cancel {
      padding: 10px 20px;
      margin-left: 10px;
      border: 1px solid ${({theme}) => theme.primary};
      background: transparent;
      color: ${({theme}) => theme.primary};
      border-radius: 3px;
      cursor: pointer;
    }

    div {
      position: relative;
      margin-bottom: 25px;

      svg {
        position: absolute;
        left: 5px;
        bottom: 10px
      }

      label {
        font-size: 13px;
        opacity: 0.6;
        position: absolute;
        bottom: 10px;
        transition: 0.3s;
        left: 30px;
        pointer-events: none;
        color: ${({theme}) => theme.color}
      }

      input {
        background: transparent;
        border: 0;
        border-bottom: 1px solid ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
        display: block;
        width: 100%;
        padding: 10px 30px;
        color: ${({theme}) => theme.color};

        ::placeholder {
          opacity: 0;
        }

        :not(:placeholder-shown),
        :focus,
        :active {
          outline: none;
          +label {
            bottom: 30px;
            font-size: 11px;
          }
        }
      }
    }
    }
  }
`

const Button = styled.button`
  padding: 10px 20px;
  border: 0;
  background: ${({theme}) => theme.primary};
  color: #fff;
  border-radius: 3px;
  border: 1px solid ${({theme}) => theme.primary};
  cursor: pointer;
`

const ErrorMessage = styled.span`
  font-size: 9px;
  color: red;
  padding: 5px;
  background: rgba(255, 0, 0, 0.05);
  display: block;
  opacity: ${({err}) => err ? 1 : 0};
  scale: ${({err}) => err ? 1 : 0};
  margin: 0 0 20px;
  transition: 0.5s;
`