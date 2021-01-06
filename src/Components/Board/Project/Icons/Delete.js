import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const DeleteIcon = () => {
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)
  return (
    <Container width="13" height="13" viewBox="0 0 17.652 17.652">
      <path id="delete" d="M8.463,19.9a1.931,1.931,0,0,0,1.925,1.925h7.7A1.931,1.931,0,0,0,20.013,19.9V8.35H8.463ZM20.976,5.463H17.607L16.644,4.5H11.831l-.963.963H7.5V7.388H20.976Z" transform="translate(-7.5 -4.5)" fill={darkTheme ? secondary : primary}/>
    </Container>
  )
}

export default DeleteIcon

const Container = styled.svg`
  cursor: pointer;
` 
