import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchItem, fetchLocation } from '../utils/api';

const Item = ({slug}) => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(false);
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
  }, [slug])
  
  const { title, description, image, momentDate, location } = item;

  const dateHappened = new Date(momentDate).toLocaleString('default', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });

  const [locationText, setLocationText] = useState([]);
  useEffect(() => {
      const { location } = item;
    if (location) {
      const lat = location[0].latitude;
      const lon = location[0].longitude;
      const getLocation = async () => {
        try {
          const data = await fetchLocation(lat, lon);
          console.log(data);
          // get name of town, county and country
          const [{ components: { town, county, country } }] = data;
          setLocationText([town, county, country]);
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
        <p>Location: {locationText[0] + ', ' + locationText[1] + ', ' + locationText[2]}</p>
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