import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { fetchItems } from '../utils/api';

const ImageList = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("createdAt_DESC");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true; 
    setIsLoading(false);
    fetchItems(searchTerm, orderBy)
      .then((items) => {
        if (active) {
          setItems(items);
        }  
      })
      .catch((err) => {
        setError(err);
      })
     
     // cleanup
    return () => {
      active = false; 
    }
  }, [searchTerm, orderBy]);

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }
  if (isLoading) return <h1 data-testid="loading">Loading....</h1>     
  return (
    <div>
      <SearchContainer>
        <div>
          <label htmlFor="order-by">Order by:</label>
          <select name="order" id="order-by" onChange={handleOrderChange}>
            <option defaultValue value={"createdAt_DESC"}>Date added DESC </option>
            <option value={"createdAt_ASC"}>Date added ASC</option>
            <option value={"momentDate_DESC"}>Date happened DESC</option>
            <option value={"momentDate_ASC"}>Date happened ASC</option>
          </select>
        </div>
        <div>
          <label htmlFor="search">Search Moments:</label>
          <input id="search" type="text" placeholder="e.g. pizza" onChange={handleSearchChange} />
        </div>
      </SearchContainer>
      {error && <h3>Oops something went wrong...</h3>}
      <List>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <ItemCard {...item} />
            </li>
          )
        })}
      </List>
    </div>
  );
};

const SearchContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
  label {
    font-size: 14px;
  }
  select {
    font-size: 12px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  @media (min-device-width: 360px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }  
`

export default ImageList;