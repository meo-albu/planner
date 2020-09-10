import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import app from '../../Auth/firebase'
import {logoutUser} from '../../Store/actions/userActions'
import { Link } from 'react-router-dom'

export const Header = () => {
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const dispatch = useDispatch()

  return (
    <Container>
      <Logo>Planner</Logo>

      {loggedIn 
        ?  <Button onClick={() => app.auth().signOut().then(() => dispatch(logoutUser()))} >Logout</Button> 
        : <div><Link to="/login" style={{marginRight: '15px'}}>Login</Link> <Button><Link to="/signup">Signup</Link></Button></div>
        }
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  background: ${({theme}) => theme.background};
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10%;
  box-shadow: 0 0 10px ${({theme}) => theme.shadow};
  color: ${({theme}) => theme.color};
  font-size: 14px;

  @media only screen and (max-width: 700px) {
    padding: 20px 5%;
    width: 100%;
  }
`

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  font-weight: 900;
  color: ${({theme}) => theme.primary};
  pointer-events: none;
`

const Button = styled.button`
  padding: 10px 20px;
  border: 0;
  background: ${({theme}) => theme.primary};
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
`