import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { closeSmallMenu } from "../../../Store/actions/smallMenuActions"
import { motion } from "framer-motion"

const SmallMenu = ({coordinates, children}) => {
   const opened = useSelector(state => state.smallMenuReducer.opened)
   const dispatch = useDispatch()
   return (
      opened &&
         <Container id="smallMenu" coordinates={coordinates}
            initial={{y: 10}}
            animate={{y: 0}}
            >
            <span id="closeMenu" onClick={() => dispatch(closeSmallMenu())} />
            <div>
               {children}
            </div>
         </Container>
   )
}

export default SmallMenu

const Container = styled(motion.div)`
   box-shadow: 2px 2px 18px ${({theme}) => theme.shadow};
   position: absolute;
   z-index: 100;
   right: 20px;
   top: ${({coordinates}) => coordinates.pageY}px;
   min-width: 180px;
   
   >div{
      background: ${({theme}) => theme.menu};
      padding: 10px 0;
      border-radius: 5px;
   }

   #closeMenu {
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
   }
`