import Modal from '../../_Reusable/Modal/Modal'
import Button from '../../_Reusable/Button/Button'
import { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { addStage } from '../../../Store/actions/projectActions'
import CloseIcon from '../Project/Icons/Close'

const AddStageModal = ({setStageModal}) => {
   const darkTheme = useSelector(state => state.themeReducer.darkTheme)
   const projectId = useSelector(state => state.projectReducer.openedProject?.projectId)
   const stages = useSelector(state => state.projectReducer.openedProject?.stages)
   const [title, setTitle] = useState('')
   const [error, setError] = useState('')
   const dispatch = useDispatch()

   const handleSubmit = e => {
      e.preventDefault()

      if(title.length > 0) {
         dispatch(addStage(projectId, title, stages.length))
         setTitle('')
         setError('')
         setStageModal(false)
      } else {
         setError('Title can not be empty.')
      }
   }

   return (
      <Container darkTheme={darkTheme}>
         <Modal setModal={setStageModal}>
            <CloseIcon onClick={() => setStageModal(false)} />
            <form onSubmit={handleSubmit}>
               <div className="input">
                  <input 
                     tipe="text" 
                     name="title" 
                     placeholder='s'
                     onChange={e => setTitle(e.target.value)} 
                     value={title} />
                  <label htmlFor="title">Title</label>
               </div>
               <div className="error">{error}</div>
               <Button>Add Stage</Button>
            </form>
         </Modal>
      </Container>
   )
}

export default AddStageModal

const Container = styled.div`
   input {
      display: block;
      width: 100%;
      margin: 20px 0 20px;
      padding: 5px 10px;
      background: none;
      color: ${({theme}) => theme.color};
      border: 1px solid ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};

      ::placeholder {
         opacity: 0;
      }

      :not(:placeholder-shown),
      :focus,
      :active {
         +label {
            transform: translateY(-180%);
         }
      }
   }
   button {
      font-size: 0.8em;
   }
   svg {
      margin-left: auto;
      display: block;
   }
   .input {
      position: relative;

      label {
         position: absolute;
         top: 50%;
         left: 10px;
         transform: translateY(-50%);
         opacity: 0.8;
         font-size: 0.9em;
         transition: transform 0.3s;
      }
   }
   .error {
      font-size: 0.8em;
      color: rgba(255, 55, 105);
      margin-bottom: 10px;
   }
`
