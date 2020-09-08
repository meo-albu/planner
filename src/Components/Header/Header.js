import React from 'react'
import styled from 'styled-components'

export const Header = () => {
  return (
    <Container>
      <Logo>Planner</Logo>

      <div><strong>Login</strong></div>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  font-weight: 900;
`