import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { client, fetchItems } from '../utils/api';
import { gql } from 'graphql-request';

const ImageList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("orderBy: createdAt_DESC");
  const [searchItem, setSearchItem] = useState("");

  // all items query
  // const query = gql`
  //   {
  //     items(${searchItem}) {
  //       id
  //       title
  //       description
  //       momentDate
  //       createdAt
  //       image {
  //         url
  //       }
  //     }
  //   }
  // `
  // const query2 = gql`
  //   query ItemsByTitle($searchItem: String) {
  //     items(where: {title_contains: $searchItem) {
  //       id
  //       title
  //       description
  //       momentDate
  //       createdAt
  //       image {
  //         url
  //       }
  //     }
  //   }
  //   {
  //     "searchItem": ${searchItem}
  //   }

  // `

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
    //client.request(query2, variables)
    fetchItems()
      .then(({ items }) => {
        console.log(items)
        setItems(items);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
  }

  return (
    <div>
      <label htmlFor="order-by">Order by:</label>
      <select name="order" id="order-by" onChange={handleOrderChange}>
        <option defaultValue value={'orderBy: createdAt_DESC'}>Added (newest first)</option>
        <option value={'orderBy: createdAt_ASC'}>Added (oldest first)</option>
        <option value={'orderBy: momentDate_DESC'}>Moment date (newest first)</option>
        <option value={'orderBy: momentDate_ASC'}>Moment date (oldest first)</option>
      </select>

      <label htmlFor="search">Search</label>
      <input type="text" placeholder="Search..." onChange={handleSearchChange}/>
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