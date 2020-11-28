import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { client } from '../utils/api';
import { gql } from 'graphql-request';

const ImageList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState('orderBy: createdAt_DESC');

  // all items query
  const query = gql`
    {
      items(${orderBy}) {
        id
        title
        description
        momentDate
        createdAt
        image {
          url
        }
      }
    }
  `

  // const mutation = gql`
  //   mutation AddImage{
  //     createItem(data: {title: "Cantona3", description: "eric", image: { create: {fileName: "https://i2-prod.manchestereveningnews.co.uk/incoming/article16419697.ece/ALTERNATES/s810/1_Eric-Cantona-Football-Manchester-United.jpg", handle: "jsahnuhBGTb djh8077hB"}}, location: {latitude: 1.5, longitude: 1.5}, slug: "eric5"}) {
  //       id
  //       title
  //     }
  //   }
  // `
  
  // fetch data from api and store in items array
  useEffect(() => {
    setIsLoading(true);
    client.request(query)
      .then(({ items }) => {
        setItems(items);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [query]);

  const handleClick = (event) => {
    setOrderBy(event);
  }

  return (
    <div>
      <button onClick={() => handleClick('orderBy: createdAt_DESC')}>Order By Date (newest first)</button>
      <button onClick={() => handleClick('orderBy: createdAt_ASC')}>Order By Date (oldest first)</button>
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