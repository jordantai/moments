import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const Header = () => {
  const title = "Moments...";

  return (
    <Link to="/">
      <MainHeader>
        {title}
      </MainHeader>
    </Link>  
  );
};

const MainHeader = styled.header`
  font-size: 3rem;
  font-family: 'Fredericka the Great', cursive;
  display: flex;
  margin-left: 1.5rem;
`;

export default Header;