import React from 'react'
import { useSelector } from 'react-redux'

const LocationIcon = () => {
  const {primary} = useSelector(state => state.themeReducer.theme)
  return (
    <svg width="20" height="20" viewBox="0 0 33 33">
      <path d="M18,12a6,6,0,1,0,6,6A6,6,0,0,0,18,12Zm13.41,4.5A13.491,13.491,0,0,0,19.5,4.59V1.5h-3V4.59A13.491,13.491,0,0,0,4.59,16.5H1.5v3H4.59A13.491,13.491,0,0,0,16.5,31.41V34.5h3V31.41A13.491,13.491,0,0,0,31.41,19.5H34.5v-3ZM18,28.5A10.5,10.5,0,1,1,28.5,18,10.492,10.492,0,0,1,18,28.5Z" transform="translate(-1.5 -1.5)" fill={primary} />
    </svg>
  )
}

export default LocationIcon