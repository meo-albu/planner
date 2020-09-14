import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CloseButton } from './CloseButton'

export const SidebarContainer = (props) => {
  const dispatch = useDispatch()
  const close = props.close
  return (
    <Container isOpen={props.isOpen} >
        <Close onClick={() => dispatch(close())}>
          <CloseButton />
        </Close>
        {props.children}
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 70px;
  z-index: 97;
  box-shadow: 0 0 10px ${({theme}) => theme.shadow};
  background: ${({theme}) => theme.background};
  transform: ${({isOpen}) => isOpen ? 'scaleX(1)' : 'scaleX(0)' };
  transition: transform 0.1s, background 0.5s;
  transform-origin: left;
  min-width: 350px;
  max-width: 350px;
  height: 100%;
  padding: 100px 15px 15px;

  @media only screen and (max-width: 700px) {
    left: 50px;
    padding: 90px 10px 15px;
    width: calc(100% - 50px);
    min-width: calc(100% - 50px);
    max-width: calc(100% - 50px);
  }
`

const Close = styled.div`
  position: absolute;
  z-index: 2;
  right: 15px;
  cursor: pointer;
`