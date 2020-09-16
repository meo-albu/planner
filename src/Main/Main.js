import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Menu } from '../Components/Menu/Menu'
import { SidebarContainer } from '../Components/Sidebar/SidebarContainer';
import { closeCalendar, closeTasks, closeUserSettings } from '../Store/actions/sidebarActions';
import Tasks from '../Components/Tasks/Tasks';
import { UserSettings } from '../Components/UserSettings/UserSettings';
import { getTasks } from '../Store/actions/taskActions';
import {gapi} from 'gapi-script'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const Main = () => {
  const {tasks, calendar, userSettings} = useSelector(state => state.sidebarReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  useEffect(() => {
    gapi.load('client', () => {
      gapi.client.init({"apiKey" : "AIzaSyCzaEgu9MjZR4fNeZmYpz2yL0A7-ZiTWpI"})
      .then(() => {
        gapi.auth.authorize({
          "client_id":"333994889676-qlfics4h77ugj7to0usjr25bn62bdac1.apps.googleusercontent.com",
          // 'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          'scope'    : 'https://www.googleapis.com/auth/calendar.events.readonly',
          'immediate': false
        }).then(() => {
          gapi.client.load('calendar', 'v3', async () => {
            const events = await gapi.client.calendar.events.list({
              calendarId: 'primary',
              timeMin: new Date().toISOString()
            })
    
            console.log(events)
          })
        })
      })
    })
  }, [])

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
