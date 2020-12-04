import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchItem } from '../utils/api';

const Item = ({slug}) => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setIsLoading(false);
    // fetchItem(slug)
    //   .then((item) => {
    //     if (active) {
    //       setItem(item);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setError(err);
    //   })
    
    // return () => {
    //   active = false;
    // }
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

  console.log(item);
  
  const { title, description, image, momentDate } = item;

  if (isLoading) return <h1>Loading....</h1> 
  return (
    <Container>
      {image
        ? <Image src={image[0].url} alt={title} />
        : <Image />
      }
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{momentDate}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  width: 90vw;
`

export default Item;