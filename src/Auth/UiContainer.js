import React from 'react'
import { AuthImage } from './AuthImage';
import styled from 'styled-components';

export const UiContainer = ({children}) => {
  return (
    <Container>
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
  background: #f9f9f9;

  >div {
    background: #fff;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
    padding: 50px;
    display: flex;
    align-items: center;
    border-radius: 30px;

    >div {
      width: 300px;
    }

    .form {
      width: 270px;
    }
  }

  .image {
    margin-right: 50px;
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
    h3 {
      font-weight: 700;
      font-style: italic;
    }

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
      }

      input {
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        display: block;
        width: 100%;
        padding: 10px 30px;

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
      background: #0061C1;
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
        opacity: 0.5;
      }

      svg {
        margin-right: 8px;
      }
    }
    
    .flex {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`