import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const CheckTask = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)

  useEffect(() => {
    setIsChecked(props.completed)
  }, [props.completed])

  return (
    <svg width="17.261" height="17.017" viewBox="0 0 20 17.017" onClick={() => setIsChecked(!isChecked)}>
      <path id="uncomplete" d="M10.306,1.892v.58a.835.835,0,0,0,.615.8,6.4,6.4,0,1,1-3.458,0,.836.836,0,0,0,.616-.8V1.892a.836.836,0,0,0-1.046-.809,8.63,8.63,0,1,0,4.309,0A.834.834,0,0,0,10.306,1.892Z" transform="translate(0) scale(0.9)" fill="#858585" opacity={isChecked ? 0.2 : 1} />
      {isChecked && <Path id="checkmark" d="M4.476,1.384,9.653,6.695,22.416-6.069" transform="translate(-3.5 7)" fill="none" stroke={darkTheme ? secondary : primary} opacity={darkTheme ? 1 : 0.7} stroke-linecap="round" stroke-linejoin="round"/>}
    </svg>
  )
}

export default CheckTask

const Path = styled.path`
  stroke-dasharray: 800;
  stroke-dashoffset: 800;
  stroke-width: 3px;
  animation: dash 10s linear forwards;

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`
