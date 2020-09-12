import React from 'react'
import { useSelector } from 'react-redux'

export const UserIcon = (props) => {
  const {primary} = useSelector(state => state.themeReducer.theme)
  return (
    <svg width="15" height="15" viewBox="0 0 20.746 23.71">
      <path id="username" d="M10.373,11.855A5.927,5.927,0,1,0,4.446,5.927,5.927,5.927,0,0,0,10.373,11.855Zm4.149,1.482h-.773a8.061,8.061,0,0,1-6.752,0H6.224A6.225,6.225,0,0,0,0,19.56v1.926A2.223,2.223,0,0,0,2.223,23.71h16.3a2.223,2.223,0,0,0,2.223-2.223V19.56A6.225,6.225,0,0,0,14.522,13.337Z" fill={primary}/>
    </svg>
  )
}