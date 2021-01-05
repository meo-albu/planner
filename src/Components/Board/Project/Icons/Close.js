import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const CloseIcon = ({onClick}) => {
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)
  return (
    <Container width="12" height="12" viewBox="0 0 17.652 17.652" onClick={onClick}>
      <g id="x" transform="translate(-309.441 -732.908)">
        <path d="M9.761,7.373,23.746-6.711" transform="translate(300.61 740.5)" fill="none" stroke={darkTheme ? secondary : primary} strokeLinecap="round" strokeWidth="2.5"/>
        <path d="M9.761,7.373,23.746-6.711" transform="translate(317.694 724.077) rotate(90)" fill="none" stroke={darkTheme ? secondary : primary} strokeLinecap="round" strokeWidth="2.5"/>
      </g>
    </Container>

  )
}

export default CloseIcon

const Container = styled.svg`
  cursor: pointer;
` 
