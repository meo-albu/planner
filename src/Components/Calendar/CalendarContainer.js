import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import styled from 'styled-components';
import { NoEventImage } from './NoEventImage';
import CloseEditIcon from '../Tasks/Icons/CloseEditIcon';
import { useSelector } from 'react-redux';
import { gapi } from 'gapi-script';
import Button from '../_Reusable/Button/Button';

export const CalendarContainer = () => {

  const theme = useSelector(state => state.themeReducer.theme)
  const darktheme = useSelector(state => state.themeReducer.darkTheme)

  const [event, setEvent] = useState(null)
  const [events, setEvents] = useState(null)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('access_token')) setAuthorized(true)
  }, [])

  const handleClick = (args) => {
    console.log(args.event)
    setEvent(args.event)
  }

  const authorizeUser = () => {
    gapi.load('client', () => {
      gapi.client.init({"apiKey" : process.env.REACT_APP_FIREBASE_API_KEY})
      .then(() => {
        gapi.auth.authorize({
          "client_id":"333994889676-qlfics4h77ugj7to0usjr25bn62bdac1.apps.googleusercontent.com",
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          'scope'    : 'https://www.googleapis.com/auth/calendar.events.readonly',
          'immediate': false
        }).then((cl) => {
          if(cl) {
            localStorage.setItem('access_token', cl.access_token)
            setAuthorized(true)
          }
        })
      })
    })
  }

  useEffect(() => {
    if(localStorage.getItem('access_token'))
      gapi.load('client', () => {
        gapi.client.setToken({'access_token': localStorage.getItem('access_token')})
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
  }, [authorized])

  return (
    <Container>
      <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleClick}
          />

      {authorized ? 

        event ? 
          <Event>
            <div onClick={() => setEvent(null)}>
              <CloseEditIcon />
            </div>
            <h4>{event.title} <span>{event.startStr && event.startStr.substring(0, 10)}</span></h4>
            <p>
              <svg width="16" height="16" viewBox="0 0 34.875 34.875">
                <path d="M18,.563A17.438,17.438,0,1,0,35.438,18,17.434,17.434,0,0,0,18,.563Zm4.015,24.616-6.2-4.507a.849.849,0,0,1-.345-.682V8.156a.846.846,0,0,1,.844-.844h3.375a.846.846,0,0,1,.844.844v9.682L25,21.087a.843.843,0,0,1,.183,1.181L23.2,25A.85.85,0,0,1,22.015,25.179Z" transform="translate(-0.563 -0.563)" fill={darktheme ? theme.secondary : theme.primary}/>
              </svg>
              <span>{event.startStr && event.startStr.substring(11, 16)} - {event.endStr && event.endStr.substring(11, 16)}</span>
            </p>
          </Event>

        : <div style={{textAlign: "center", paddingBottom: '30px'}}>
            <NoEventImage />
            Select an event in calendar to see more details
          </div>

      : <Permission>
          <p>Planner needs permission to access your Google Calendar</p>
          <Button onClick={authorizeUser}>Authorize</Button>
        </Permission>}

    </Container>
  )
}

const Permission = styled.div`
  margin-top: 25px;
  padding: 10px 15px 25px;
  font-size: 14px;
  text-align: center;
  
  p {
    margin: 0 0 20px;
  }
`

const Event = styled.div`
  margin-top: 25px;
  box-shadow: 0 0 5px ${({theme}) => theme.shadow};
  padding: 10px 15px 25px;
  font-size: 14px;

  h4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    margin: 10px 0 25px;

    span {
      opacity: 0.8;
      font-weight: 400;
      font-size: 13px;
    }
  }

  p {
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    span {
      opacity: 0.8;
      font-size: 13px;
    }
  }

  >div {
    width: 15px;
    margin-left: auto;
  }
`

const Container = styled.div`
  padding-top: 40px;
  height: 100%;
  overflow-y: scroll;

  &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' };
      }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        transition: 0.5s;
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)' };
    }

  .fc * {
    border: 0;
    text-align: center;
  }

  .fc {
    font-size: 11px;
    border: 0
  }

  .fc .fc-daygrid-day-top { 
    font-size: 13px;
  }
  .fc .fc-col-header-cell-cushion { 
    font-size: 13px;
  }

  .fc .fc-toolbar-chunk .fc-toolbar-title {
    font-size: 17px;
  }

  .fc .fc-toolbar-chunk .fc-button-group {
    font-size: 10.5px;
    
    button {
      background: ${({theme}) => theme.primary};
      border: 0;
    }
  }

  .fc .fc-toolbar-chunk .fc-today-button {
    font-size: 11px;
    background: ${({theme}) => theme.primary};
    border: 0;
  }

  .fc .fc-daygrid-day-top {
    justify-content: center;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background: ${({theme}) => theme.primary};
    color: white
  }

  .fc-daygrid-event {
    background: ${({theme}) => theme.secondary};
  }

  .fc-col-header {
    width:100% !important;
  }

  .fc .fc-scroller {
    .fc-daygrid-body {
      width:100% !important;
      .fc-scrollgrid-sync-table {
        width:100% !important;
      }
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' };
      }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        transition: 0.5s;
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)' };
    }
  }
`
