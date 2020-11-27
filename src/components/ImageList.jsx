import React, {useState} from 'react';
import { client } from '../utils/api';
import { gql } from 'graphql-request';

const ImageList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

   const query = gql`
    {
      items {
        title
        description
        image {
          url
        }
      }
    }
  `

  client.request(query)
    .then(({items}) => {
      setItems(items);
    })

  return (
    <div>
      {items.map((item) => {
        <h3>{item.title}</h3>
      })}
    </div>
  );
};

export default ImageList;