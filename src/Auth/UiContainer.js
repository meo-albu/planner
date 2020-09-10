import React from 'react'
import { AuthImage } from './AuthImage';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export const UiContainer = ({children}) => {
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  return (
    <Container darkTheme={darkTheme}>
      <div>
        <div className="image">
          <AuthImage />
        </div>
        <div className="form">
          {children}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({theme}) => theme.background};
  padding-top: 65px;
  color: ${({theme}) => theme.color};

  @media only screen and (max-width: 700px) {
    display: block;
    }

  >div {
    background: ${({theme}) => theme.background};
    box-shadow: 3px 3px 20px ${({theme}) => theme.shadow};
    padding: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;

    @media only screen and (max-width: 700px) {
      display: block;
      padding: 50px 5%;
      width: 100%;
    }

    >div {
      width: 300px;
    }

    .form {
      width: 270px;

      @media only screen and (max-width: 700px) {
        width: 100%;
      }
    }
  }

  .image {
    margin-right: 50px;

    @media only screen and (max-width: 700px) {
      margin: 0 auto 20px;
      width: 150px;
    }
  }

  >svg {
    width: 300px;
    height: 300px;
  }

  input {
    :focus {
      border: 0;
      outline: 0;
    }
  }

  .form {
    .username,
    .email,
    .password {
      position: relative;
      padding-top: 30px;

      svg {
        position: absolute;
        left: 5px;
        bottom: 10px
      }

      label {
        font-size: 13px;
        opacity: 0.6;
        position: absolute;
        bottom: 10px;
        transition: 0.3s;
        left: 30px;
        pointer-events: none;
        color: ${({theme}) => theme.color}
      }

      input {
        background: transparent;
        border: 0;
        border-bottom: 1px solid ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
        display: block;
        width: 100%;
        padding: 10px 30px;
        color: ${({theme}) => theme.color};

        ::placeholder {
          opacity: 0;
        }

        :not(:placeholder-shown),
        :focus,
        :active {
          +label {
            bottom: 35px;
            font-size: 11px;
          }
        }
      }
    }

    input[type="submit"] {
      padding: 10px 30px;
      border: 0;
      background: ${({theme}) => theme.primary};
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
    }
    
    .google {
      font-size: 12px;
      display: flex;
      align-items: center;
      border: 0;
      background: none;
      cursor: pointer;

      :focus {
        outline: 0;
        border: 0;
      }
      
      span {
        color: ${({theme}) => theme.color};
        opacity: 0.5;
      }

      svg {
        margin-right: 8px;
      }
    }
    
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`