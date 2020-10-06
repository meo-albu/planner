import React from 'react'
import styled from 'styled-components'
import Day from './Day'
import Bg from './Icons/Bg'

export const Forecast = ({forecast}) => {
  const biggestTemp = forecast.forecastData.daily.reduce((p, v) => (p.temp.day > v.temp.day ? p : v));
  return (
    <Container>
      <Bg />
      {`${forecast.locality}, ${forecast.countryCode} - ${Math.round(forecast.forecastData.current.temp)}°C`}
      <Daily>
        {
          forecast.forecastData.daily.slice(1).map((day, index) => {
            return <div key={index}>
              {`${Math.round(day.temp.day)}°C`}
              <Day percent={`${Math.round((day.temp.day / biggestTemp.temp.day) * 100)}%`} />
              {new Date(day.dt * 1000).toString().substring(0, 3)}
            </div>
          })
        }
      </Daily>
    </Container>
  )
}

const Container = styled.div`

`

const Daily = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-weight: 700;
  text-transform: lowercase;
  font-variant: small-caps;
  margin-top: 60px;
  /* overflow-x: scroll; */
  /* width: 100%; */
`