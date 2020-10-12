import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'

const AddCard = (props) => {
   const {primary} = useSelector(state => state.themeReducer.theme)
   return (
      <Container onClick={props.onClick}>
         <svg width="12" height="12" viewBox="0 0 15.451 15.451">
            <g id="add" transform="translate(0.5 0.5)">
            <path id="Path_24" d="M17.451,10.226A7.226,7.226,0,1,1,10.226,3,7.226,7.226,0,0,1,17.451,10.226Z" transform="translate(-3 -3)" fill="none" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            <path id="Path_25" d="M18,12v5.781" transform="translate(-10.774 -7.665)" fill="none" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            <path id="Path_26" d="M12,18h5.781" transform="translate(-7.665 -10.774)" fill="none" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            </g>
         </svg>
      </Container>
   )
}

export default AddCard

const Container = styled.div`
   display: flex;
   justify-content: center;
   padding: 15px;
   cursor: pointer;
   background: rgba(0, 0, 0, 0.05);
   border-radius: 3px;
`