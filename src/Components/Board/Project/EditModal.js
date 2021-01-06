import Modal from '../../_Reusable/Modal/Modal'
import Button from '../../_Reusable/Button/Button'
import { useState } from 'react'
import styled from 'styled-components'
import CloseIcon from './Icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { editProject } from '../../../Store/actions/projectActions'

const EditModal = ({setEditModal}) => {
   const darkTheme = useSelector(state => state.themeReducer.darkTheme)
   const projectId = useSelector(state => state.projectReducer.openedProject?.projectId)
   const projectTitle = useSelector(state => state.projectReducer.openedProject?.title)
   const [title, setTitle] = useState(projectTitle)
   const [error, setError] = useState('')
   const dispatch = useDispatch()

   const handleSubmit = e => {
      e.preventDefault()

      if(title.length > 0) {
         dispatch(editProject(projectId, title))
         setTitle('')
         setError('')
         setEditModal(false)
      } else {
         setError('Title can not be empty.')
      }
   }

   return (
      <Container darkTheme={darkTheme}>
         <Modal setModal={setEditModal}>
            <CloseIcon onClick={() => setEditModal(false)} />
            <form onSubmit={handleSubmit}>
               Change projects title:
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
               <Button>Confirm</Button>
            </form>
         </Modal>
      </Container>
   )
}

export default EditModal

const Container = styled.div`
   input {
      display: block;
      width: 100%;
      margin: 30px 0 20px;
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
