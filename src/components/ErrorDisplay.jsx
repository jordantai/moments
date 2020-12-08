import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const ErrorDisplay = ({ msg }) => {
  const err = msg ? msg : 'Oops something went wrong! Path not found: 404!';
  return (
    <section>
      <h3>{err}</h3>
      <Link to="/">
        <Button>Back</Button>
      </Link> 
    </section>
  );
};

const Button = styled.button`
  width: 90vw;
  background-color: tomato;
  border: 2px solid #cc4f38;
  color: white;
  border-radius: 3px;
  padding: 0.25rem;
  font-size: 16px;
  :hover {
    background-color: #e5593f;
  }
`

export default ErrorDisplay;