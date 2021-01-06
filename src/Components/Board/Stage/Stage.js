import React, { useState } from 'react'
import styled from 'styled-components'
import {useDrop} from 'react-dnd'
import AddCard from '../Card/AddCard'
import AddCardModal from '../Card/AddCardModal'
import Card from '../Card/Card'

const Stage = ({title, stage, moveCard, stageId, cards}) => {

   const [{isOver}, drop] = useDrop({
    accept: 'card',
    collect: monitor => ({isOver: !!monitor.isOver()}), 
    drop: (item, monitor) => moveCard(item.id, stage)
  })

  const [cardModal, setCardModal] = useState(false)

   return (
      <Container ref={drop} isOver={isOver}>
         {cardModal && <AddCardModal setCardModal={setCardModal} stageId={stageId} cards={cards} /> }
         {title}
         {cards.map(card => {
            return <Card 
                     key={card.cardId} 
                     cardId={card.cardId} 
                     title={card.title} 
                     description={card.description} />
         })}
         <AddCard onClick={() => setCardModal(true)} />
      </Container>
   )
}

export default Stage

const Container = styled.div`
   // background: ${({isOver}) => isOver ? 'grey' : 'white'};
   font-weight: 700;
   width: 250px;
`
