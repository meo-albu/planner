import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { UserIcon } from '../Menu/Buttons/UserIcon'
import { EmailButton } from '../Menu/Buttons/EmailButton'
import { UserButton } from '../Menu/Buttons/UserButton'
import app from '../../Auth/firebase'
import { setUser } from '../../Store/actions/userActions'
import { setLoader, stopLoader } from '../../Store/actions/loaderActions'
import { ChangePassword } from './ChangePassword'
import { DarkTheme } from '../DarkTheme'

export const UserSettings = (props) => {
  const user = useSelector(state => state.userReducer.user)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const dispatch = useDispatch()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [readonly, setReadonly] = useState(true)
  const [changePass, setChangePass] = useState(false)

  useEffect(() => {
    setUsername(user.username)
    setEmail(user.email)
  }, [user])

  const updateUserData = e => {
    e.preventDefault()
    const [name, mail] = e.target.elements

    const userDetails = app.auth().currentUser
    dispatch(setLoader())

    userDetails.updateProfile({
        displayName: name.value
      }).then(() => {
        userDetails.updateEmail(mail.value)
        .then(() =>{
          dispatch(setUser({
            username: userDetails.displayName,
            email: userDetails.email,
            avatar: userDetails.photoURL
          }))
          setReadonly(true)
          dispatch(stopLoader())
        }).catch(error => {
          dispatch(stopLoader())
          console.log(error)
        })
      }).catch(error => {
        dispatch(stopLoader())
        console.log(error)
      })
  }

  return (
    <Container isOpen={props.isOpen}>
      <h3>User Settings</h3>
      <form onSubmit={updateUserData}>
        <Image>
          { user.avatar ? <img alt="user avatar" src={user.avatar} /> : <UserButton /> }
        </Image>
        <Field readonly={readonly} darkTheme={darkTheme}>
          <UserIcon /> <input type='text' name='username' value={username || ''} readOnly={readonly} onChange={e => setUsername(e.target.value)} />
        </Field>
        <Field readonly={readonly} darkTheme={darkTheme}>
          <EmailButton /> <input type='text' name='email' value={email || ''} readOnly={readonly} onChange={e => setEmail(e.target.value)} />
        </Field>
        <Button type={readonly ? 'button' : 'submit'} onClick={readonly ? (e) => {e.preventDefault(); setReadonly(!readonly)} : console.log() } >{readonly ? 'Edit Information' : 'Submit'}</Button>
        {!readonly && <button type='button' className="cancel" onClick={() => setReadonly(true)}>Cancel</button>}
      </form>
      {changePass ? <ChangePassword setChangePass={setChangePass} /> : <button type='button' className='changepass' onClick={() => setChangePass(true)} >Change Password</button>}
      <DarkTheme />
    </Container>
  )
}

const Container = styled.div`
  button:focus {
    outline: 0;
  }

  form {

    .cancel {
      padding: 10px 20px;
      margin-left: 10px;
      border: 1px solid ${({theme}) => theme.primary};
      background: transparent;
      color: ${({theme}) => theme.primary};
      border-radius: 3px;
      cursor: pointer;
    }
  }

  .changepass {
    margin: 30px 0 20px;
    border: 0;
    background: 0;
    cursor: pointer;
    color: ${({theme}) => theme.secondary};
    font-style: italic;
    text-decoration: underline;
  }
`

const Field = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding-bottom: 10px;
  border-bottom: ${({darkTheme, readonly}) => readonly ? `1px solid rgba(255, 255, 255, 0)` : darkTheme ? `1px solid rgba(255, 255, 255, 0.2)` : `1px solid rgba(0, 0, 0, 0.1)` };

  input { 
    border: 0;
    padding: 0 10px;
    font-family: 'Montserrat';
    font-size: 14px;
    width: 100%;
    background: transparent;
    color: ${({theme}) => theme.color};

    :focus {
      outline: 0;
    }
  }

`

const Image = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  margin: 15px 0 20px;

  svg,
  img {
    width: 100%;
    height: 100%;
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