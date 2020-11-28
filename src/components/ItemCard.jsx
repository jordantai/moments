import React from 'react';
import styled from 'styled-components';
import { randomTransform } from '../utils/functions';

const ItemCard = ({ title, description, image, momentDate }) => {
  const imageUrl = image[0].url;
  const dateHappened = new Date(momentDate).toLocaleString('default', { year: 'numeric', month: '2-digit', day: '2-digit' });
  let randomNum = randomTransform(-5, 5);

  return (
    <Card style={{transform: `rotate(${randomNum}deg)`}}>
      <ImageBox style={{ backgroundImage: `url(${imageUrl})` }} />
      <h4>{title}</h4>
      <p>{dateHappened}</p>
    </Card>
  );
};

const Card = styled.div`
  background-color:white;
  width: 85vw;
  height: 16rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  box-shadow: 5px 5px 9px -2px rgba(0, 0, 0, 0.75);
  h4, p {
    margin: 0.5rem;
    margin-left: 1rem;
    font-family: 'Permanent Marker', cursive;
  }
  h4 {
    font-size: 1.2rem;
  }
  p {
    font-size: 0.8rem;
  }
`

const ImageBox = styled.div`
  width: 90%;
  height: 90%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 1rem;
  align-self: center;
`

export default ItemCard;