import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ConfirmEditIcon = () => {
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)
  return (
    <Container width="12" height="12" viewBox="0 0 17.652 17.652">
      <path d="M4.127,1,9.761,6.587l13.095-13.3" transform="translate(-3.248 7.588)" fill="none" stroke={darkTheme ? secondary : primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
    </Container>
  )
}

export default ConfirmEditIcon

const Container = styled.svg`
  margin: 0 0 0 auto !important;
  cursor: pointer;
` 
