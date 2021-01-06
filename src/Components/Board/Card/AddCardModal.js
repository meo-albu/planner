import Modal from '../../_Reusable/Modal/Modal'
import Button from '../../_Reusable/Button/Button'
import { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { addCard } from '../../../Store/actions/projectActions'
import CloseIcon from '../Project/Icons/Close'

const AddCardModal = ({setCardModal, stageId, cards}) => {
   const darkTheme = useSelector(state => state.themeReducer.darkTheme)
   const projectId = useSelector(state => state.projectReducer.openedProject?.projectId)
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [error, setError] = useState('')
   const dispatch = useDispatch()

   const handleSubmit = e => {
      e.preventDefault()

      
      if(title.length > 0 && description.length > 0) {
         dispatch(addCard(projectId, stageId, title, description, cards.length))
         setTitle('')
         setDescription('')
         setError('')
         setCardModal(false)
      } else {
         setError('All fields are required.')
      }
   }

   return (
      <Container darkTheme={darkTheme}>
         <Modal setModal={setCardModal}>
            <CloseIcon onClick={() => setCardModal(false)} />
            <form onSubmit={handleSubmit}>
               <div className="input">
                  <input 
                     tipe="text" 
                     name="title" 
                     placeholder='title'
                     onChange={e => setTitle(e.target.value)} 
                     value={title} />
                  <label htmlFor="title">Title</label>
               </div>
               <div className="input">
                  <textarea 
                     tipe="text" 
                     name="description" 
                     placeholder='description'
                     rows="3"
                     onChange={e => setDescription(e.target.value)} 
                     value={description} />
                  <label htmlFor="description">Description</label>
               </div>
               <div className="error">{error}</div>
               <Button>Add Card</Button>
            </form>
         </Modal>
      </Container>
   )
}

export default AddCardModal

const Container = styled.div`
   font-weight: 400;
   textarea,
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
      margin-bottom: 30px;

      label {
         position: absolute;
         top: 15px;
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
