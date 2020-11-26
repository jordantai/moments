import React from 'react';
import styled from 'styled-components';

const Header = () => {
  const title = "Moments...";

  return (
    <MainHeader>
      {title}
    </MainHeader>
  );
};

const MainHeader = styled.header`
  font-size: 3rem;
  font-family: 'Fredericka the Great', cursive;
`;

export default Header;