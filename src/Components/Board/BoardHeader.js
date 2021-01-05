import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { closeProject } from '../../Store/actions/projectActions'

const BoardHeader = (props) => {
   const dispatch = useDispatch()
   return (
      <Container>
         <span onClick={() => dispatch(closeProject())} >Home</span>  {props.project && <>&#8250; {props.project}</>}
      </Container>
   )
}

export default BoardHeader

const Container = styled.div`
   padding: 1em;
   background: rgba(0, 0, 0, 0.02);

   span {
      cursor: pointer;
   }
`