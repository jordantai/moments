import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { fetchItems } from '../utils/api';

const ImageList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("createdAt_DESC");
  const [searchTerm, setSearchTerm] = useState("");

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
    fetchItems(searchTerm, orderBy)
      .then(({ items }) => {
        console.log(items)
        setItems(items);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [searchTerm, orderBy]);

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <SearchContainer>
        <label htmlFor="order-by">Order by:</label>
        <select name="order" id="order-by" onChange={handleOrderChange}>
          <option defaultValue value={"createdAt_DESC"}>Date added (newest first) </option>
          <option value={"createdAt_ASC"}>Date added (oldest first)</option>
          <option value={"momentDate_DESC"}>Date happened (newest first)</option>
          <option value={"momentDate_ASC"}>Date happened (oldest first)</option>
        </select>

        <label htmlFor="search">Search</label>
        <input type="text" placeholder="Search..." onChange={handleSearchChange} />
      </SearchContainer>  
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

const SearchContainer = styled.div`
  margin-bottom: 1rem;
`;

export default ImageList;