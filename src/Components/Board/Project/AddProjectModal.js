import Modal from '../../_Reusable/Modal/Modal'
import Button from '../../_Reusable/Button/Button'
import { useState } from 'react'
import styled from 'styled-components'
import CloseIcon from './Icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { addProject } from '../../../Store/actions/projectActions'

const AddProjectModal = ({setModal}) => {
   const darkTheme = useSelector(state => state.themeReducer.darkTheme)
   const [title, setTitle] = useState('')
   const [error, setError] = useState('')
   const dispatch = useDispatch()

   const handleSubmit = e => {
      e.preventDefault()

      if(title.length > 0) {
         dispatch(addProject(title))
         setTitle('')
         setError('')
         setModal(false)
      } else {
         setError('Title can not be empty.')
      }
   }

   return (
      <Container darkTheme={darkTheme}>
         <Modal setModal={setModal}>
            <CloseIcon onClick={() => setModal(false)} />
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
               <Button>Add Project</Button>
            </form>
         </Modal>
      </Container>
   )
}

export default AddProjectModal

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
