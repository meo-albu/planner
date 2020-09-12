import React from 'react'
import styled from 'styled-components'
import Task from './Task'

const Tasks = () => {
  return (
    <Container>
      <h3>Tasks</h3>
      <Task>
        task 1
      </Task>
    </Container>
  )
}

export default Tasks

const Container = styled.div`
  height: 100%;

  h3 {
    margin-bottom: 15px;
    padding-left: 10px;
  }
`

