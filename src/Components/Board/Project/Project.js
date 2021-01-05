import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Project = (props) => {

   const darktheme = useSelector(state => state.themeReducer.darkTheme)

   return (
      <Container border={props.color} darktheme={darktheme} onClick={props.onClick} >
         <div>
            {props.title} <br />
            <span>{props.createdAt}</span>
         </div> 
      </Container>
   )
}

export default Project

const Container = styled.div`
   padding: 10px 20px;
   margin-bottom: 10px;
   border-left: 5px solid ${({border}) => border};
   background: ${({darktheme}) => darktheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.01)'};
   box-shadow: 1px 1px 2px ${({theme}) => theme.shadow};
   cursor: pointer;
   transition: background 0.1s;
   font-size: 0.9em;
   font-weight: 600;
   max-width: 600px;

   :hover {
      background: ${({darktheme}) => darktheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'};
   }

   span {
      opacity: 0.7;
      font-weight: 400;
      font-size: 0.9em;
   }
`
