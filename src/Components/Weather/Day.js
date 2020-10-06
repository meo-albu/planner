import React from "react";
import styled from "styled-components";

export default function Day(props) {
  return <Container percent={props.percent} />;
}

const Container = styled.div`
  width: 10px;
  height: 70px;
  border-radius: 10px;
  background: ${({theme}) => theme.shadow};
  position: relative;
  margin: 0 auto 10px;

  :before {
    position: absolute;
    content: "";
    background: ${({theme}) => theme.secondary};
    left: 0;
    bottom: 0;
    right: 0;
    top: ${({ percent }) => percent && `calc(100% - ${percent})`};
    border-radius: 10px;
  }
`;