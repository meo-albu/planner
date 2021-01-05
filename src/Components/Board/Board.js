import BoardHeader from './BoardHeader'
import styled from 'styled-components'
import Project from './Project/Project'
import AddProject from './Project/AddProject'
import { useDispatch, useSelector } from 'react-redux'
import { setProjects, openProject } from '../../Store/actions/projectActions'
import { useEffect } from 'react'
import ProjectPage from './Project/ProjectPage'

const Board = () => {
   const projects = useSelector(state => state.projectReducer.projects)
   const openedProject = useSelector(state => state.projectReducer.openedProject)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(setProjects())
   }, [dispatch])

   const getTheDate = (seconds) => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const date = new Date(seconds * 1000)
      return `${days[date.getDay()]}, ${date.getUTCDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
   }

   return (
      <>
      <BoardHeader project={openedProject?.title} />
      {openedProject 
         ?   <ProjectPage project={openedProject} />
         :   <Container>
               <AddProject />
               {projects.map(project => {
                  return <Project 
                           onClick={() => dispatch(openProject(project.projectId))}
                           key={project.projectId} 
                           title={project.title} 
                           createdAt={getTheDate(project.createdAt.seconds)}
                           color={project.color} 
                           />
               })}
            </Container>
         }
      </>
   )
}

export default Board

const Container = styled.div`
   padding: 10px;

   @media only screen and (min-width: 1000px) {
      padding: 30px;
   }
`