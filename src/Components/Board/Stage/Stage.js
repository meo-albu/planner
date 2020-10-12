import React from 'react'
import styled from 'styled-components'
import {useDrop} from 'react-dnd'

const Stage = (props) => {

   const [{isOver}, drop] = useDrop({
    accept: 'card',
    collect: monitor => ({isOver: !!monitor.isOver()}), 
    drop: (item, monitor) => props.moveCard(item.id, props.stage)
  })

   return (
      <Container ref={drop} isOver={isOver}>
         {props.children}
      </Container>
   )
}

export default Stage

const Container = styled.div`
   margin: 25px;
   // background: ${({isOver}) => isOver ? 'grey' : 'white'};
   font-weight: 700;
   width: 250px;
`
