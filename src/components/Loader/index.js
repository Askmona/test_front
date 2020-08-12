import React from 'react';
import styled from 'styled-components';

const Load = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  height: 100vh;
  display: flex;
  align-items: center;
  margin: 0 auto;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #4054b2;
    border-radius: 50%;
    animation: load 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #4054b2 transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    } 
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

const Loader = () => (
  <Load>
    <div />
    <div />
    <div />
    <div />
  </Load>
);

export default Loader;
