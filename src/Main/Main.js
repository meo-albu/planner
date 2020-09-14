import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Menu } from '../Components/Menu/Menu'
import { SidebarContainer } from '../Components/Sidebar/SidebarContainer';
import { closeCalendar, closeTasks, closeUserSettings } from '../Store/actions/sidebarActions';
import Tasks from '../Components/Tasks/Tasks';
import { UserSettings } from '../Components/UserSettings/UserSettings';
import { getTasks } from '../Store/actions/taskActions';
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const Main = () => {
  const {tasks, calendar, userSettings} = useSelector(state => state.sidebarReducer)
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
        <strong>Calendar</strong>
      </SidebarContainer>
      <SidebarContainer isOpen={userSettings} close={closeUserSettings}>
        <UserSettings />
      </SidebarContainer>
    </Container>
  )
}

const Container = styled.div`
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  padding: 100px 10% 30px;
  position:relative;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`
