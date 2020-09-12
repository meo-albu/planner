import React from 'react'
import { useSelector } from 'react-redux'

export const Burger = (props) => {
  const {primary} = useSelector(state => state.themeReducer.theme)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 27 15.75">
      <g id="burger" transform="translate(-4.5 -10.125)">
        <path id="Path_4" data-name="Path 4" d="M30.375,12.375H5.625A1.128,1.128,0,0,1,4.5,11.25h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,11.25h0A1.128,1.128,0,0,1,30.375,12.375Z" transform={props.expanded ? 'translate(-2.683 22.614) rotate(-45)' : 'translate(0) rotate(0)'} fill={primary}/>
        <path id="Path_5" data-name="Path 5" d="M30.375,19.125H5.625A1.128,1.128,0,0,1,4.5,18h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,18h0A1.128,1.128,0,0,1,30.375,19.125Z" opacity={props.expanded ? 0 : 1} fill={primary} style={{transition: '0.1s'}}/>
        <path id="Path_6" data-name="Path 6" d="M30.375,25.875H5.625A1.128,1.128,0,0,1,4.5,24.75h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,24.75h0A1.128,1.128,0,0,1,30.375,25.875Z" transform={props.expanded ? 'translate(22.773 -12.387) rotate(45)' : 'translate(0) rotate(0)'} fill={primary}/>
      </g>
    </svg>
  )
}