import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { client } from '../utils/api';
import { gql } from 'graphql-request';

const ImageList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // all items query
  const query = gql`
    {
      items {
        id
        title
        description
        image {
          url
        }
      }
    }
  `
  // fetch data from api and store in items array
  useEffect(() => {
    setIsLoading(true);
    client.request(query)
      .then(({ items }) => {
        setItems(items);
        console.log(items);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [query]);

  return (
    <div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <ItemCard {...item} />
            </li>  
          )  
        })}
      </ul>
    </div>
  );
};

export default ImageList;