import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Item from '../components/Item';
import { fetchItem, graphCmsEndpoint, getItemBySlugQuery, fetchLocation, openCageBaseUrl } from '../utils/api';

jest.mock('axios');
let data;
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
  return data;
});

describe('fecthItem()', () => {
  test('fetches single item from api', async () => {
    
    const slug = "title-name";

    axios.post.mockResolvedValue({ data });
    return fetchItem(slug)
      .then((data) => {
        expect(data).toEqual(data);
        expect(axios.post).toHaveBeenLastCalledWith(graphCmsEndpoint, { query: getItemBySlugQuery, variables: { slug: slug } }, { headers: { 'Content-Type': 'application/json' } });
      });
  });
  test('Fetches erroneously data from api', async() => {
    const err = "error"
    const slug = "[][][";
    axios.post.mockImplementationOnce(() => 
      Promise.reject(new Error(err))
    );
    await expect(fetchItem()).rejects.toThrow(err);
  })
});
describe('fetchLocation()', () => {
  test('fetches reverse geo coded location when passed lat and lon coordinates', async () => {
    const OPENCAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;
    const lat = 53.4630589;
    const lon = -2.2913401;
    const address = "Old Trafford";
    const data = {
      data: {
        results: [
          {
            formatted: "Old Trafford",
          }
        ]
      }
    };  
  
    axios.get.mockResolvedValue(data);
    return fetchLocation(lat, lon)
      .then((data) => {
        expect(data[0].formatted).toEqual(address);
        expect(axios.get).toHaveBeenCalledWith(`${openCageBaseUrl}`, { params: { q: lat + "," + lon, key: OPENCAGE_API_KEY } });
        expect(axios.get).toHaveBeenCalledTimes(1);
      })
  })
});
describe('Item', () => {
  test('renders Item component and displays api data', async() => {
    render(<Item />);
    const title = await screen.findByRole('heading', { name: /Title Name/i });
    expect(title).toBeInTheDocument();
    const image = await screen.findByRole('img', { src: "http://somelink.com" });
    expect(image).toBeInTheDocument();
    const description = await screen.findByText("\"blah blah\"");
    expect(description).toBeInTheDocument();
    const momentDate = await screen.findByText("Wednesday, 20 December 2017");
    expect(momentDate).toBeInTheDocument();
    //const address = await screen.findByText("")
  });
});