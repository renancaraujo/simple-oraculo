import React, { useState } from 'react';
import delay from 'delay'
import styled, { keyframes } from 'styled-components'
import classNames from 'classnames';


const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 130px;
  max-height: 40px;
`

const Button = styled.button`
  outline:none;
  height: 40px;
  text-align: center;
  width: 130px;
  border-radius:40px;
  background: #fff;
  border: 2px solid #1ECD97;
  color: #1ECD97;
  letter-spacing:1px;
  text-shadow:0;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    color:white;
    background: #1ECD97;
  }
  &:active {
    letter-spacing: 2px ;
  }
  &:after {
    content:"SUBMIT";
  }

  &.loading {
    width: 40px;
    border-color: #bbbbbb;
    border-width:3px;
    font-size:0;
    border-left-color: #1ECD97;
    animation: ${rotating} 2s 0.25s linear infinite;
    &:after {
      content:"";
    }
    &:hover {
      color: #1ECD97;
      background: white;
    }
  }
  &.validated {
    font-size:13px;
    color: white;
    background: #1ECD97;
    &:after {
      font-family:'FontAwesome';
      content:"\f00c";
    }
  }
  &.errored {
    font-size:13px;
    color: white;
    background: #ff3838;
    border-color: #ff3838;
    &:after {
      font-family:'FontAwesome';
      content:"\f00d";
    }
  }
`

const App = () => {
  const [ state, setState ] = useState({ loading: false, error: null })
  const onSubmit = async () => {
    setState({
      loading: true,
      error: null
    })
    await delay(1e3)
    const error = Math.random() >= 0.5
    
    window.navigator.vibrate(error ? 400 : 100)
    
    setState({
      loading: false,
      error
    })
  }
  return (
    <Container>
      <Button className={classNames({
        loading: state.loading,
        errored: state.error,
        validated: state.error === false
      })} onClick={onSubmit} disabled={state.loading} />
    </Container>
  );
}
 
export default App;