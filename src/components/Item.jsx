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
    fetchItem(slug)
      .then((item) => {
        if (active) {
          setItem(item);
        }
      })
    
    return () => {
      active = false;
    }
  }, [])
  
  const { title, description, image, momentDate } = item;

  const imageUrl = image[0].url;
  return (
    <div> 
      <Image src={imageUrl} />
    </div>
  );
};

const Image = styled.img`
  height: 15rem;
`

export default Item;