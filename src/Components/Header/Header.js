import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import app from '../../Auth/firebase'
import {logoutUser} from '../../Store/actions/userActions'
import { Link } from 'react-router-dom'
import Button from '../_Reusable/Button/Button'

export const Header = () => {
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const dispatch = useDispatch()

  return (
    <Container>
      <Logo>Planner</Logo>

      {loggedIn 
        ? <Button onClick={() => app.auth().signOut().then(() => dispatch(logoutUser()))} >Logout</Button> 
        : <div><Link to="/login" style={{marginRight: '15px'}}>Login</Link> <Link to="/signup"><Button>Signup</Button></Link></div>
        }
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  background: ${({theme}) => theme.menu};
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 85px;
  box-shadow: 0 0 10px ${({theme}) => theme.shadow};
  color: ${({theme}) => theme.color};
  font-size: 14px;
  z-index: 99;

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