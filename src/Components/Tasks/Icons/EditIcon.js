import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const EditIcon = () => {
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)
  return (
    <Container width="15" height="15" viewBox="0 0 17.652 17.652">
      <path id="Icon_material-edit" data-name="Icon material-edit" d="M4.5,18.471v3.677H8.177L19.022,11.3,15.345,7.627ZM21.865,8.46a.976.976,0,0,0,0-1.383L19.571,4.783a.976.976,0,0,0-1.383,0L16.394,6.577l3.677,3.677L21.865,8.46Z" transform="translate(-4.5 -4.496)" fill={darkTheme ? secondary : primary} />
    </Container>
  )
}

export default EditIcon

const Container = styled.svg`
  margin: 0 0 0 auto !important;
  cursor: pointer;
` 
