import React from 'react'
import { useSelector } from 'react-redux'

const AddIcon = () => {
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)

  return (  
    <svg width="16" height="16" viewBox="0 0 18.07 18.07">
      <path id="add" d="M25.91,16.875H19.125V10.09a1.125,1.125,0,0,0-2.25,0v6.785H10.09a1.125,1.125,0,0,0,0,2.25h6.785V25.91a1.125,1.125,0,0,0,2.25,0V19.125H25.91a1.125,1.125,0,0,0,0-2.25Z" transform="translate(-8.965 -8.965)" fill={darkTheme ? secondary : primary} />
    </svg>
  )
}

export default AddIcon
