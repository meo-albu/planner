import styled from 'styled-components'
import { motion } from 'framer-motion'

const Modal = ({setModal, children}) => {
   return (
      <Container>
         <span id="closeModal" onClick={() => setModal(false)} />
         <motion.div
            initial={{y: -15}}
            animate={{y: 0}}
         >
            {children}
         </motion.div>
      </Container>
   )
}

export default Modal

const Container = styled.div`
   position: fixed;
   z-index: 150;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   box-shadow: 2px 2px 5px ${({theme}) => theme.shadow};
   width: 350px;
   max-width: 95%;
   
   >div {
      background: white;
      background: ${({theme}) => theme.background};
      padding: 25px;
      border-radius: 4px;
   }

   #closeModal {
      position: absolute;
      z-index: -1;
      top: -50vh;
      left: -50vw;
      bottom: -50vh;
      right: -50vw;
      background: rgba(0, 0, 0, 0.5);
   }
`
