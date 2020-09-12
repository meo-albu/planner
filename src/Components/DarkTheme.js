import React from 'react'
import { setDarkTheme, setLightTheme } from '../Store/actions/themeActions'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'


export const DarkTheme = () => {
  const dispatch = useDispatch()
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)

  const changeTheme = () => {
    if(darkTheme) {
      dispatch(setLightTheme())
    } else {
      dispatch(setDarkTheme())
    }
  }

  return (
    <Container>
      <div>Dark Mode</div>
      <input type="checkbox" checked={darkTheme} onChange={changeTheme} id="toggle"/>
      <label htmlFor="toggle"></label>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  label {
    position: relative;
    display: block;
    width: 60px;
    height: 33.3px;
    border-radius: 33.3px;
    background-color: ${({theme}) => theme.primary};
    overflow: hidden;
    transition: background .2s ease;
    transform: scale(0.7);

    cursor: pointer;
    &:before,
    &:after {
      display: block;
      position: absolute;
      content: "";		
      width: 24px;
      height: 24px;
      border-radius: 50%;
      top: 4.5px;
      left: 5px;
      transition: transform .5s ease;
    }
    &:before {
      background-color: #fff;

    }

    &:after {
      background-color: ${({theme}) => theme.primary};
      left: -16px;
      transform: scale(0.00001);
    }
  }

  input[type="checkbox"] {
    display: none;
    &:checked + label {
      &:before {
        background-color: #FFF;
        transform: translateX(26px);
      }
      
      &:after {
        transform: translateX(37px) translateY(-3px) scale(1);
      }
    }
}
`
