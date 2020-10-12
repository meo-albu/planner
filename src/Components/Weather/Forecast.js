import React from 'react'
import styled from 'styled-components'
import Day from './Day'
import Bg from './Icons/Bg'
import { useSelector } from 'react-redux'
import { Today } from './Today'

export const Forecast = ({forecast, children}) => {
  const {darkTheme} = useSelector(state => state.themeReducer)
  const biggestTemp = forecast.forecastData.daily.reduce((p, v) => (p.temp.day > v.temp.day ? p : v));
  return (
    <Container>
      <Bg />
      <Today 
         icon={forecast.forecastData.current.weather[0].icon} 
         temp={forecast.forecastData.current.temp.toString().substring(0, 2)}
         locality={forecast.locality}
         countryCode={forecast.countryCode}
         feelsLike={forecast.forecastData.current.feels_like.toString().substring(0, 2)}
         sunset={new Date(forecast.forecastData.current.sunset * 1000).toString().substring(16, 21)}
      />
      <Daily darkTheme={darkTheme}>
        {
          forecast.forecastData.daily.slice(1).map((day, index) => {
            return <div key={index}>
              {`${Math.round(day.temp.day)}°C`}
              <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt='weather condition' />
              <Day percent={`${Math.round((day.temp.day / biggestTemp.temp.day) * 100)}%`} />
              {new Date(day.dt * 1000).toString().substring(0, 3)}
            </div>
          })
        }
      </Daily>
      {children}
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
  margin: 30px -15px 0;
  padding: 10px;
  overflow-x: scroll;

  &:hover {
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' };
    }
  }

  &::-webkit-scrollbar {
      height: 5px;
  }

  &::-webkit-scrollbar-thumb {
      transition: 0.5s;
      border-radius: 5px;
      background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
  }

  img {
      display: block;
      width: 40px;
      filter: ${({darkTheme}) => darkTheme 
         ? 'invert(69%) sepia(7%) saturate(2900%) hue-rotate(180deg) brightness(104%) contrast(101%)' 
         : 'invert(69%) sepia(7%) saturate(5000%) hue-rotate(180deg) brightness(104%) contrast(101%)' };
  }
`