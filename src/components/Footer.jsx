import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <FooterText>
      <p>Moments... {year}</p>
    </FooterText>
  );
};

const FooterText = styled.footer`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-right: 1rem;
  p {
    font-family: 'Fredericka the Great', cursive; 
  }
`

export default Footer;