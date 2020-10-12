import React, { useState } from 'react'
import BoardHeader from './BoardHeader'
import styled from 'styled-components'
import Card from './Card/Card'
import Stage from './Stage/Stage'
import AddCard from './Card/AddCard'

const Board = () => {
   const [Cards, setCards] = useState([
      {
         id: 1,
         name: 'lala 1',
         stage: 'todo'
      },
      {
         id: 2,
         name: 'lala 2',
         stage: 'todo'
      },
      {
         id: 3,
         name: 'lala 3',
         stage: 'todo'
      },
      {
         id: 4,
         name: 'lala 4',
         stage: 'doing'
      },
      {
         id: 5,
         name: 'lala 5',
         stage: 'done'
      }
   ])

   const moveCard = (id, whereTo) => {
      setCards(cards => {
         return cards.map(card => {
            if( card.id === id ) 
               return {...card, stage: whereTo}
            return card
         })
      })
   }

   return (
      <div>
         <BoardHeader />
         <Container>
            <Stage moveCard={moveCard} stage='todo'>
               <p>TODO:</p>
               {Cards.filter(card => {
                  return card.stage === 'todo'
               }).map(card => {
                  return <Card key={card.id} id={card.id} name={card.name} />
               })}
               <AddCard onClick={() => console.log('todo')} />
            </Stage>
            <Stage moveCard={moveCard} stage='doing'>
               <p>DOING:</p>
               {Cards.filter(card => {
                  return card.stage === 'doing'
               }).map(card => {
                  return <Card key={card.id} id={card.id} name={card.name} />
               })}
            </Stage>
            <Stage moveCard={moveCard} stage='done'>
               <p>DONE:</p>
               {Cards.filter(card => {
                  return card.stage === 'done'
               }).map(card => {
                  return <Card key={card.id} id={card.id} name={card.name} />
               })}
            </Stage>
         </Container>
      </div>
   )
}

export default Board

const Container = styled.div`
   display: flex;
   flex-wrap: wrap
`