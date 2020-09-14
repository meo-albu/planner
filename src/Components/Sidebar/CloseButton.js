import React from 'react'
import { useSelector } from 'react-redux'

export const CloseButton = () => {
  const {primary} = useSelector(state => state.themeReducer.theme)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 27 20.683">
      <g id="burger_2" data-name="burger 2" transform="translate(-4.5 -7.5)">
        <path id="Path_4" data-name="Path 4" d="M30.375,12.375H5.625A1.128,1.128,0,0,1,4.5,11.25h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,11.25h0A1.128,1.128,0,0,1,30.375,12.375Z" transform="translate(-2.683 22.614) rotate(-45)" fill={primary}/>
        <path id="Path_6" data-name="Path 6" d="M30.375,25.875H5.625A1.128,1.128,0,0,1,4.5,24.75h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,24.75h0A1.128,1.128,0,0,1,30.375,25.875Z" transform="translate(22.773 -12.387) rotate(45)" fill={primary}/>
      </g>
    </svg>
  )
}
