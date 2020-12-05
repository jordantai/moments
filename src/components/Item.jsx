import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchItem, fetchLocation } from '../utils/api';

const Item = ({slug}) => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const data = await fetchItem(slug);
        const item = data.data.item;
        setItem(item);
      } catch (err) {
        console.log(err);
      }  
    }
    getItem();
    setIsLoading(false);
  }, [slug])
  
  const { title, description, image, momentDate, location } = item;

  const dateHappened = new Date(momentDate).toLocaleString('default', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });

  const [locationText, setLocationText] = useState("");
  useEffect(() => {
      const { location } = item;
    if (location) {
      const lat = location[0].latitude;
      const lon = location[0].longitude;
      const getLocation = async () => {
        try {
          const data = await fetchLocation(lat, lon);
          // get pre formatted location data
          const [{ formatted }] = data;
          setLocationText(formatted);
        } catch (err) {
          console.log(err);
        }
      }
      getLocation();
    }  
  }, [item, location]);

  if (isLoading) return <h1>Loading....</h1> 
  return (
    <Container>
      {image
        ? <Image src={image[0].url} alt={title} />
        : <Image />
      }
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Date: {dateHappened}</p>
        <p>Location: {locationText}</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin: 0 1rem 1rem 1rem;
  }
`

const Image = styled.img`
  width: 90vw;
`

export default Item;