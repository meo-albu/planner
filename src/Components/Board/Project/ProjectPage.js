import styled from "styled-components"
import AddStage from "../Stage/AddStage"
import DotsIcon from "./Icons/Dots"
import { useDispatch, useSelector } from "react-redux"
import { openSmallMenu } from "../../../Store/actions/smallMenuActions"
import ProjectMenu from "./ProjectMenu"
import { useState } from "react"
import ConfirmDeleteModal from './ConfirmDeleteModal'
import EditModal from "./EditModal"
import Stage from "../Stage/Stage"
import AddStageModal from "../Stage/AddStageModal"

const ProjectPage = ({project}) => {

   const dispatch = useDispatch()
   const stages = useSelector(state => state.projectReducer.openedProject?.stages)
   const [deleteModal, setDeleteModal] = useState(false)
   const [editModal, setEditModal] = useState(false)
   const [stageModal, setStageModal] = useState(false)

   const handleClick = (e) => {
      dispatch(openSmallMenu({pageX: e.pageX, pageY: e.pageY}))
   }

   return (
      <Container>
         {deleteModal && <ConfirmDeleteModal deleteModal={setDeleteModal} /> }
         {editModal && <EditModal setEditModal={setEditModal} /> }
         {stageModal && <AddStageModal setStageModal={setStageModal} /> }

         <Title>
            <h3>{project.title}</h3>
            <DotsIcon onClick={handleClick} />
            <ProjectMenu setDeleteModal={setDeleteModal} setEditModal={setEditModal} />
         </Title>

         <section>
            {stages.map(stage => {
               return <Stage key={stage.stageId} stageId={stage.stageId} title={stage.title} cards={stage.cards} />
            })}
            <AddStage onClick={() => setStageModal(true)} />
         </section>
      </Container>
   )
}

export default ProjectPage

const Container = styled.div`
   padding: 25px;
   height: 80%;

   section {
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
      overflow-x: scroll;
      height: 100%;

      >*{
         min-width: 250px;
         margin-right: 25px;
      }

      &:hover {
         &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' };
         }
      }

      &::-webkit-scrollbar {
            height: 10px;
      }

      &::-webkit-scrollbar-thumb {
            transition: 0.5s;
            border-radius: 5px;
            background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
      }
   }
`

const Title = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: space-between;

   h3 {
      margin-bottom: 30px;
   }
`

export const prj = {
   stages: Array(
      {
         title: String,
         cards: Array(
            {
               title: String,
               description: String
            }
         ),
         createdAt: Date,
      },
   )
}
