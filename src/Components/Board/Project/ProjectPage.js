// import { useDispatch } from "react-redux"
// import { closeProject } from "../../../Store/actions/projectActions"
import styled from "styled-components"
// import Stage from "../Stage/Stage"
import AddStage from "../Stage/AddStage"

const ProjectPage = ({project}) => {
   // const dispatch = useDispatch()

   return (
      <Container>
         <h3>{project.title}</h3>
         {/* <button onClick={() => dispatch(closeProject())}>close project</button> */}

         <section>
            {/* <Stage /> */}
            <AddStage />
         </section>
      </Container>
   )
}

export default ProjectPage

const Container = styled.div`
   padding: 25px;

   section {
      display: flex;
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
