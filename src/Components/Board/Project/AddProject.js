import React, { useState } from 'react'
import styled from 'styled-components'
import AddIcon from './Icons/Add'
import AddProjectModal from './AddProjectModal'

const AddProject = (props) => {
   const [modal, setModal] = useState(false)

   return (
      <>
         <Container onClick={() => setModal(true)}>
            <AddIcon /> Add New Project
         </Container>
         {modal && <AddProjectModal setModal={setModal} />}
      </>
   )
}

export default AddProject

const Container = styled.div`
   display: inline-flex;
   align-items: center;
   margin: 15px 0 25px;
   cursor: pointer;

   svg {
      margin-right: 7px;
   }
`
