import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Menu } from '../Components/Menu/Menu'
import { SidebarContainer } from '../Components/Sidebar/SidebarContainer';
import { closeCalendar, closeTasks, closeUserSettings } from '../Store/actions/sidebarActions';
import Tasks from '../Components/Tasks/Tasks';
import { UserSettings } from '../Components/UserSettings/UserSettings';
import { getTasks } from '../Store/actions/taskActions';

import {gapi} from 'gapi-script'
import { CalendarContainer } from '../Components/Calendar/CalendarContainer';


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export const Main = () => {
  const {tasks, calendar, userSettings} = useSelector(state => state.sidebarReducer)
  const dispatch = useDispatch()
  const [events, setEvents] = useState([{title: 'event 1', 'date': '2020-10-07'}])

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])


  useEffect(() => {
    gapi.load('client', () => {
      gapi.client.init({"apiKey" : process.env.REACT_APP_FIREBASE_API_KEY})
      .then(() => {
        gapi.auth.authorize({
          "client_id":"333994889676-qlfics4h77ugj7to0usjr25bn62bdac1.apps.googleusercontent.com",
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          'scope'    : 'https://www.googleapis.com/auth/calendar.events.readonly',
          'immediate': false
        }).then(() => {
          let ev = []
          gapi.client.load('calendar', 'v3', async () => {
            const events = await gapi.client.calendar.events.list({
              calendarId: 'primary',
              timeMin: new Date().toISOString()
            })

            events.result.items.forEach(event => {
              ev.push({
                title: event.summary,
                start: event.start.dateTime,
                end: event.end.dateTime
              })
            })
            setEvents(ev)
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
        <CalendarContainer events={events} />
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
