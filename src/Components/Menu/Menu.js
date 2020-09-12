import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Burger } from './Buttons/Burger'
import { TodoButton } from './Buttons/TodoButton'
import { CalendarButton } from './Buttons/CalendarButton'
import { UserButton } from './Buttons/UserButton'
import {openTasks, openCalendar, closeCalendar, closeTasks, openUserSettings, closeUserSettings} from '../../Store/actions/sidebarActions'

export const Menu = () => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  const darkTheme = useSelector(state => state.themeReducer.darkTheme)

  return (
    <Container>
      <Button darkTheme={darkTheme} onClick={() => setExpanded(!expanded)} style={{alignSelf: 'flex-start'}}>
        <Burger expanded={expanded} />
      </Button>
      <Button expanded={expanded} darkTheme={darkTheme} onClick={() => {dispatch(openTasks()); dispatch(closeCalendar()); dispatch(closeUserSettings()); setExpanded(false)} }>
        <TodoButton /> {expanded && 'Tasks'}
      </Button>
      <Button expanded={expanded} darkTheme={darkTheme} onClick={() => {dispatch(openCalendar()); dispatch(closeTasks()); dispatch(closeUserSettings()); setExpanded(false)} }>
        <CalendarButton /> {expanded && 'Calendar'}
      </Button>
      <Button expanded={expanded} darkTheme={darkTheme} style={{marginTop: 'auto'}} onClick={() => {dispatch(openUserSettings()); dispatch(closeCalendar()); dispatch(closeTasks()); setExpanded(false)} } >
        <UserButton /> {expanded && 'User'}
      </Button>
    </Container>
  )
}

const Container = styled.div`
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  height: 100%;
  padding: 100px 5px 20px;
  /* box-shadow: 0 0 10px ${({theme}) => theme.shadow}; */
  border-right: 1px solid ${({theme}) => theme.shadow};
  position: absolute;
  z-index: 98;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  transition: 0.3s, background 0.5s;
`

const Button = styled.button`
  padding: 15px 20px;
  background: none;
  border: 0;
  transition: background 0.3s;
  cursor: pointer;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  color: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)' };

  :hover {
    background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' };
  }

  @media (hover: none) {
    :hover {
      background: none;
    }
  }

  @media only screen and (max-width: 700px) {
    padding: 10px 10px;
  }
  
  svg {
    display: block;
    margin-right: ${({expanded}) => expanded ? '15px' : 0 };
    transition: 0.5s;

    path {
      transition: 0.3s;
    }
  }

  :focus,
  :active {
    -webkit-tap-highlight-color: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' };
    outline: 0;
    border: 0;
  }
`