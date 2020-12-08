import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { fetchItems } from '../utils/api';
import { FaSearch, FaSort } from 'react-icons/fa';

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
          <label htmlFor="order-by"><FaSort /></label>
          <select name="order" id="order-by" onChange={handleOrderChange}>
            <option defaultValue value={"createdAt_DESC"}>Date added DESC </option>
            <option value={"createdAt_ASC"}>Date added ASC</option>
            <option value={"momentDate_DESC"}>Date happened DESC</option>
            <option value={"momentDate_ASC"}>Date happened ASC</option>
          </select>
        </div>
        <div>
          <label htmlFor="search"><FaSearch /></label>
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
  justify-content: center;
  div {
    display: flex;
    align-items: flex-start;
  }
  label {
    font-size: 1rem;
    margin-right: 4px;
  }
  select, input {
    background-color: white;
    font-size: 0.8rem;
    border: none;
    border-bottom: 2px solid darkslategrey;
    margin-right: 1rem;
    border-radius: 3px 3px 0 0;
    outline: none;
    :active, :focus {
      border-bottom: 2px solid darkorange;
    }
  }
  @media (min-device-width: 768px) {
    label {
      font-size: 1.3rem;
    }
    select, input {
      font-size: 1rem;
    }
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-device-width: 360px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }  
`

export default ImageList;