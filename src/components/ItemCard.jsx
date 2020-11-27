import React from 'react';
import styled from 'styled-components';

const ItemCard = ({ title, description, image, createdAt }) => {
  const imageUrl = image[0].url;
  const postedDate = new Date(createdAt).toDateString();
  return (
    <Card>
      <ImageBox style={{ backgroundImage: `url(${imageUrl})` }} />
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{postedDate}</p>
    </Card>
  );
};

const Card = styled.div`
  background-color: grey;
  width: 85vw;
  height: 16rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  h4, p {
    margin: 0.5rem;
    margin-left: 1rem;
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