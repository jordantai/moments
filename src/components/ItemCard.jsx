import React from 'react';
import styled from 'styled-components';

const ItemCard = ({ title, description, image }) => {
  const imageUrl = image[0].url;
  return (
    <Card>
      <ImageBox style={{ backgroundImage: `url(${imageUrl})` }} />
      <h4>{title}</h4>
      <p>{description}</p> 
    </Card>
  );
};

const Card = styled.div`
  background-color: grey;
  width: 85vw;
  height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

const ImageBox = styled.div`
  width: 90%;
  height: 90%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 1rem;
`

export default ItemCard;