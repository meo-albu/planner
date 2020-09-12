import React from 'react'
import styled from 'styled-components'

const Task = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Task

const Container = styled.div`
  box-shadow: 0 0 5px ${({theme}) => theme.shadow};
  padding: 10px;
`