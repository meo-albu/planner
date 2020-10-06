import React, { useEffect, useState, memo } from 'react'
import styled from 'styled-components'
import LocationMarkIcon from './Icons/LocationMarkIcon'
import LocationIcon from './Icons/LocationIcon'
import WeatherImg from './Icons/WeatherImg'
import { Forecast } from './Forecast'

const Weather = () => {
  const [forecast, setForecast] = useState(null)
  const [Results, setResults] = useState([])
  const [Query, setQuery] = useState('')
  const [WeatherLocation, setWeatherLocation] = useState(localStorage.getItem('WeatherLocation') ? JSON.parse(localStorage.getItem('WeatherLocation')) : {} )

  const fetchWeather = (lat, long) => {
    fetch(`
        https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}
        `)
        .then(res => res.json())
        .then(response => {
          fetch(`
          https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat.toString().substring(0, 5)}&longitude=${long.toString().substring(0, 5)}&localityLanguage=en`)
          .then(res => res.json())
          .then(data => {
            setForecast({locality: data.locality, countryCode: data.countryCode, forecastData: response})
          })
        })
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem('WeatherLocation', JSON.stringify({lat: position.coords.latitude, long: position.coords.longitude}))
        setWeatherLocation({lat: position.coords.latitude, long: position.coords.longitude})
      });
    }
  }

  const setLocation = e => {
    setQuery(e.target.value)
    fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${e.target.value}`)
    .then(response => response.json())
    .then(data => {
      setResults(data.records)
    })
  }
  
  const setWeather = (lat, long) => {
    localStorage.setItem('WeatherLocation', JSON.stringify({lat, long}))
    setWeatherLocation({lat, long})
    setResults([])
    setQuery('')
  }

  useEffect(() => {
    const {lat, long} = WeatherLocation
    if(lat && long) fetchWeather(lat, long)
  }, [WeatherLocation])

  return (
    <Container>
      {WeatherLocation.lat ? 
        forecast && <Forecast forecast={forecast}>
           <button onClick={() => setWeatherLocation('')}>change city</button>
        </Forecast>
        :
        <>
          <WeatherImg />
          When bees stay close to the hive, <nobr>rain is close by.</nobr>
          <span>Keep in mind the weather when you are planning your day</span>

          <div className="getLocation" >
            <LocationMarkIcon />
            <form onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Enter location" value={Query} onChange={setLocation} />
              <AutoComplete>
                {Results.map(result => {
                  return <div key={result.fields.geoname_id} onClick={() => setWeather(result.fields.latitude, result.fields.longitude)}>{result.fields.name}, {result.fields.country_code}</div>
                })}
              </AutoComplete>
            </form>
            <div onClick={getLocation}>
              <LocationIcon />
            </div>
          </div>
        </>
      }
    </Container>
  )
}

export default memo(Weather)

const AutoComplete = styled.div`
  position: absolute;
  top: 110%;
  width: 100%;
  background: ${({theme}) => theme.background};
  text-align: left;
  
  div {
    padding: 5px;
    cursor: pointer;

    :hover {
      background: rgba(0, 0, 0, 0.1)
    }
  }
`

const Container = styled.div`
  margin-left: auto;
  text-align: center;

  form {
    position: relative;
    width: 100%;
  }

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
