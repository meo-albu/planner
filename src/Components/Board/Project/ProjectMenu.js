import SmallMenu from '../../_Reusable/SmallMenu/SmallMenu'
import { useSelector, useDispatch } from 'react-redux'
import DeleteIcon from './Icons/Delete'
import styled from 'styled-components'
import EditIcon from './Icons/Edit'
import { closeSmallMenu } from '../../../Store/actions/smallMenuActions'

const ProjectMenu = ({setDeleteModal, setEditModal}) => {

   const coordinates = useSelector(state => state.smallMenuReducer.coordinates)
   const dispatch = useDispatch()

   return (
      <SmallMenu coordinates={coordinates}>
         <MenuButon onClick={() => {
            setDeleteModal(true)
            dispatch(closeSmallMenu())
         }}>
            <DeleteIcon /> &nbsp; Delete Project
         </MenuButon>
         <MenuButon onClick={() => {
            setEditModal(true)
            dispatch(closeSmallMenu())
         }}>
            <EditIcon /> &nbsp; Edit Project
         </MenuButon>
      </SmallMenu>
   )
}

export default ProjectMenu

const MenuButon = styled.div`
   padding: 5px 15px;
   cursor: pointer;
   transition: background 0.1s;
   font-size: 0.9em;
   display: flex; 
   align-items: center;
   margin-top: 5px;

   :hover {
      background: ${({theme}) => theme.shadow};
   }
`
