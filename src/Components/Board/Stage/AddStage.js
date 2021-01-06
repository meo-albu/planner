import styled from 'styled-components'
import {useSelector} from 'react-redux'

const AddStage = (props) => {
   const {primary} = useSelector(state => state.themeReducer.theme)
   return (
      <Container onClick={props.onClick}>
         <svg width="15" height="15" viewBox="0 0 15.451 15.451">
            <g id="add" transform="translate(0.5 0.5)">
            <path id="Path_24" d="M17.451,10.226A7.226,7.226,0,1,1,10.226,3,7.226,7.226,0,0,1,17.451,10.226Z" transform="translate(-3 -3)" fill="none" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            <path id="Path_25" d="M18,12v5.781" transform="translate(-10.774 -7.665)" fill="none" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            <path id="Path_26" d="M12,18h5.781" transform="translate(-7.665 -10.774)" fill="none" stroke={primary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            </g>
         </svg>
         Add New Stage
      </Container>
   )
}

export default AddStage

const Container = styled.div`
   display: flex;
   align-items: center;
   padding: 10px;
   cursor: pointer;
   background: rgba(0, 0, 0, 0.1);
   border-radius: 3px;
   font-size: 0.8em;
   font-weight: 400;
   transition: background 0.1s;
   opacity: 0.7;
   min-width: 220px;

   svg {
      margin-right: 10px;
   }

   :hover {
      opacity: 1;
   }
`