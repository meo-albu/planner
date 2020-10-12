import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Menu } from '../Components/Menu/Menu'
import { SidebarContainer } from '../Components/Sidebar/SidebarContainer';
import { closeCalendar, closeTasks, closeUserSettings, closeWeather } from '../Store/actions/sidebarActions';
import Tasks from '../Components/Tasks/Tasks';
import { UserSettings } from '../Components/UserSettings/UserSettings';
import { getTasks } from '../Store/actions/taskActions';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'

import { CalendarContainer } from '../Components/Calendar/CalendarContainer';
import Weather from '../Components/Weather/Weather';
import Board from '../Components/Board/Board';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const Main = () => {
  const {tasks, calendar, userSettings, weather} = useSelector(state => state.sidebarReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  return (
    <Container>
      <Menu />
      <SidebarContainer isOpen={tasks} close={closeTasks}>
        <Tasks />
      </SidebarContainer>
      <SidebarContainer isOpen={calendar} close={closeCalendar}>
        <CalendarContainer />
      </SidebarContainer>
      <SidebarContainer isOpen={userSettings} close={closeUserSettings}>
        <UserSettings />
      </SidebarContainer>
      <SidebarContainer isOpen={weather} close={closeWeather}>
        <Weather />
      </SidebarContainer>

      <DndProvider backend={HTML5Backend}>
         <DndProvider backend={TouchBackend}>
            <Board />
         </DndProvider>
      </DndProvider>
    </Container>
  )
}

const Container = styled.div`
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  padding: 70px 0 0 70px;
  position:relative;
  height: calc(var(--vh, 1vh) * 100);
  height: 100vh;

  @media only screen and (max-width: 700px) {
    padding: 70px 0 0 50px;
  }
`
