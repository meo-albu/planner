import React from 'react'
import { useSelector } from 'react-redux'

const LocationMarkIcon = () => {
  const {primary} = useSelector(state => state.themeReducer.theme)
  return (
    <svg width="20" height="20" viewBox="0 0 27 36">
      <path d="M12.113,35.274C1.9,20.463,0,18.943,0,13.5a13.5,13.5,0,0,1,27,0c0,5.443-1.9,6.963-12.113,21.774a1.688,1.688,0,0,1-2.775,0ZM13.5,19.125A5.625,5.625,0,1,0,7.875,13.5,5.625,5.625,0,0,0,13.5,19.125Z" fill={primary} />
    </svg>
  )
}

export default LocationMarkIcon
