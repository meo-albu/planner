import React from 'react'
import styled from 'styled-components'

export const Today = ({icon, temp, locality, countryCode, feelsLike, sunset}) => {
   return (
      <Container>
         <Flex>
            <div>
               <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather condition' />
            </div>
            <div>
               Today <br />
               <span>{new Date().toString().substring(4, 15)}</span>
            </div>

         </Flex>

         <Temp>
            <p>{temp}<sup> °C</sup> </p>
            <br /><span>{locality}, {countryCode}</span><br/>
            <span>Feels like: {feelsLike} &middot; Sunset: {sunset}</span>
         </Temp>
      </Container>
   )
}

const Container = styled.div`
   text-align: left;
`
const Temp = styled.div`
   text-align: center;
   line-height: 1.3;

   p {
      font-size: 50px;
      margin: 30px 0 0;
      line-height: 0.5;

      sup {
         font-size: 20px;
      }
   }

   br + span {
      font-size: 11px;
   }
`
const Flex = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   font-weight: 700;
`