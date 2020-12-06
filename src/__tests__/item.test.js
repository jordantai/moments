import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from '../components/Item';
import { fetchItem, graphCmsEndpoint, getItemBySlugQuery } from '../utils/api';

jest.mock('axios');

beforeEach(() => {
  const data = {
    data: {
      item: {
        id: 1,
        createdAt: "2020-11-29T11:13:26.467296+00:00",
        description: "blah blah",
        image: [
          {
            url: "http://somelink.com",
          }
        ],
        momentDate: "2017-12-20",
        title: "Title Name",
        location: [
          {
            latitude: 53.3843893,
            longitude: -2.0625815
          }
        ]
      }
    }
  }
  axios.post.mockResolvedValue({ data });
});

describe('fecthItem()', () => {
  test('fetches single item from api', async() => {
    const data = {
      data: {
        items: 
        [
          {
            id: 1,
            createdAt: "2020-11-29T11:13:26.467296+00:00",
            description: "blah blah",
            image: [
              {
                url: "http://somelink.com",
              }
            ],
            momentDate: "2017-12-20",
            title: "Title Name"
          }
        ]
      }  
    }
    
    const slug = "title-name";

    axios.post.mockResolvedValue({ data });
    return fetchItem(slug)
      .then((data) => {
        expect(data).toEqual(data);
        expect(axios.post).toHaveBeenLastCalledWith(graphCmsEndpoint, { query: getItemBySlugQuery, variables: { slug: slug } }, { headers: { 'Content-Type': 'application/json' } });
      });
  })
})