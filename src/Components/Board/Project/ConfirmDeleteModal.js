import Modal from '../../_Reusable/Modal/Modal'
import Button from '../../_Reusable/Button/Button'
import styled from 'styled-components'
import CloseIcon from './Icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { removeProject } from '../../../Store/actions/projectActions'

const ConfirmDeleteModal = ({deleteModal}) => {
   const projectId = useSelector(state => state.projectReducer.openedProject?.projectId)
   const title = useSelector(state => state.projectReducer.openedProject?.title)
   const dispatch = useDispatch()

   return (
      <Container>
         <Modal setModal={deleteModal}>
            <CloseIcon onClick={() => deleteModal(false)} />
            <div className="confirmMessage">Are you sure you want to delete {title}?</div>
            <Button onClick={() => dispatch(removeProject(projectId))} >Delete Project</Button>
         </Modal>
      </Container>
   )
}

export default ConfirmDeleteModal

const Container = styled.div`
   .confirmMessage {
      margin: 20px 0;
   }

   svg {
      margin: 0 0 0 auto;
      display: block;
   }
`
