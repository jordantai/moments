import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchItem, fetchLocation } from '../utils/api';
import { FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Item = ({slug}) => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const data = await fetchItem(slug);
        const item = data.data.item;
        console.log(item);
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
      <h2>{title}</h2>
      {image
        ? <Image src={image[0].url} alt={title} />
        : <Image />
      }
      <div>
        <p className="description">"{description}"</p>
        <p><FaRegCalendarAlt /> <span>{dateHappened}</span></p>
        <p><FaMapMarkerAlt /> <span>{locationText}</span></p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    align-self: flex-start;
    font-family: 'Permanent Marker', cursive;
    margin: 1rem 1.5rem;
  }
  div {
    align-self: flex-start;
    margin: 0 1.5rem 1rem 1.5rem;
    .description {
      font-style: italic;
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
    span {
      font-weight: bold;
    }
  }
`
const Image = styled.img`
  width: 90vw;
  border-radius: 5px;
`

export default Item;