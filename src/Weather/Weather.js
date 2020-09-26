import React, { useState } from 'react'
import styled from 'styled-components'
import LocationMarkIcon from './Icons/LocationMarkIcon'
import LocationIcon from './Icons/LocationIcon'
import WeatherImg from './Icons/WeatherImg'

export const Weather = () => {
  const [CityName, setCityName] = useState(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position)

        fetch(`
        https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}
        `)
        .then(res => res.json())
        .then(response => {
          // console.log(response)
          fetch(`
          https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude.toString().substring(0, 5)}&longitude=${position.coords.longitude.toString().substring(0, 5)}&localityLanguage=en`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setCityName(`${data.locality}, ${data.countryCode} - ${Math.round(response.current.temp)}°C`)
          })
        })
      });
    }
  }

  return (
    <Container>
      {navigator.geolocation && <WeatherImg />}
      When bees stay close to the hive, <nobr>rain is close by.</nobr>
      <span>Keep in mind the weather when you are planning your day</span>

      <div className="getLocation" >
        <LocationMarkIcon />
        <input type="text" placeholder="Enter location" />
        <div onClick={getLocation}>
          <LocationIcon />
        </div>
      </div>

      <div>
        {CityName}
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 30%;
  margin-left: auto;
  text-align: center;

  > svg {
    display: block;
    width: 60%;
    max-width: 230px;
    margin: 0 auto 25px;
    height: 150px;
  }
  
  @media only screen and (max-width: 700px) {
    width: 100%;

    > svg {
      margin-bottom: 15px;
    }
  }

  span {
    display: inline-block;
    font-size: 0.8em;
    opacity: 0.7;
  }

  .getLocation {
    background: rgba(0, 0, 0, 0.1);
    padding: 15px;
    display: flex;
    align-items: center;
    margin-top: 25px;
    border-radius: 5px;

    > svg {
      margin-right: 10px;
    }

    div>svg {
      margin-left: auto;
      opacity: 0.6;
      cursor: pointer;
      vertical-align: middle;

      :hover {
        opacity: 1;
      }
    }
    
    input {
      color: ${({theme}) => theme.color};
      border: 0;
      background: 0;
      width: 100%;
    }
  }
`
