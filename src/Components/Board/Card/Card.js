import React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Card = (props) => {
   // const [Cards, setCards] = useState([])

   // const moveCard = (id, whereTo) => {
   //    setCards(cards => {
   //       return cards.map(card => {
   //          if( card.id === id ) 
   //             return {...card, stage: whereTo}
   //          return card
   //       })
   //    })
   // }
   const [{isDragging}, drag] = useDrag({
      item: { type: 'card', id: props.id },
      collect: monitor => ({isDragging: !!monitor.isDragging()})
   })

   return (
      <Container ref={drag} isDragging={isDragging} drag='y' layout>
         {props.name}
      </Container>
   )
}

export default Card

const Container = styled(motion.div)`
   padding: 15px;
   border-radius: 3px;
   box-shadow: 1px 1px 3px ${({theme}) => theme.shadow};
   cursor: pointer;
   opacity: ${({isDragging}) => isDragging ? 0.2 : 1};
   margin: 10px 0;
`
