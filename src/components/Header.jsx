import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const Header = () => {
  const title = "Moments...";
  const subTitle = "Your fondest memories"

  return (
    <Link to="/">
      <MainHeader>
        {title}
        <h2>{subTitle}</h2>
      </MainHeader>
    </Link>  
  );
};

const MainHeader = styled.header`
  font-size: 3rem;
  font-family: 'Fredericka the Great', cursive;
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 2.5rem;
  h2 {
    font-size: 0.9rem;
    margin: 0 0 0 2rem;
  }
`;

export default Header;