import React from 'react';
import axios from 'axios';
import { act, render, screen } from '@testing-library/react';
import { fetchItems, endpoint } from '../utils/api';
import App from '../App';
import ImageList from '../components/ImageList';
import ItemCard from '../components/ItemCard';

jest.mock('axios');

describe('fetchItems()', () => {
  test('fetches data successfully from api', async () => {
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
    axios.post.mockResolvedValueOnce({ data });
    return fetchItems()
      .then((data) => {
        expect(data).toEqual(data);
      })
  });
  test('Fetches erroneously data from api', async() => {
    const err = 'Network error';
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(err)),
    );
    await expect(fetchItems()).rejects.toThrow(err);
  })
});

describe('App', () => {
  test('renders App component', async() => {
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
    axios.post.mockResolvedValue({ data });
    render(<App />);
    const header = await screen.findAllByRole('heading');
    expect(header[0]).toBeInTheDocument();
    const headerTitle = await screen.findByText(/Moments.../);
    expect(headerTitle).toBeInTheDocument();
  })
});

describe('ImageList', () => {
  test('renders ImageList component', async() => {
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
    axios.post.mockResolvedValue({ data });
    render(<ImageList />); 
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(1);
  })
  test('displays list items of fetched api data', async () => {
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
    axios.post.mockResolvedValue({ data });
    
    render(<ImageList />);
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(1);
    const title = await screen.findByText(/Title Name/);
    const momentDate = await screen.findByText('20/12/2017');
    expect(title).toBeInTheDocument();
    expect(momentDate).toBeInTheDocument();

  });
})