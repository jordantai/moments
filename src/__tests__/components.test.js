import React from 'react';
import axios from 'axios';
import { render, act, screen } from '@testing-library/react';
import { fetchItems } from '../utils/api';
import App from '../App';
import ImageList from '../components/ImageList';

jest.mock('axios');

describe('fetchItems()', () => {
test('fetches items from api', async() => {
    const mockData = [
      {
        id: "ksdjhsjkgadjk",
        createdAt: "some date",
        description: "blah blah",
        image: [
          {
            url: "http://somelink.com",
          }
        ],
        momentDate: "another date",
        title: "some name"
      }
    ];

    const response = { data: mockData };
    axios.post.mockResolvedValue(response)
    return fetchItems()
      .then((data) => {
        expect(data).toEqual(mockData)
      })
    
    
    
  })
});

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Order by:')).toBeInTheDocument();
    expect(screen.getByText('Search Moments:')).toBeInTheDocument();
  })
});

describe('ImageList', () => {
  test('renders ImageList component', () => {
    render(<ImageList />);
  })
  test('displays list items of fetched api data', async() => {
    const data = {
      data: {
        items: [
          {
            id: "ksdjhsjkgadjk",
            createdAt: "some date",
            description: "blah blah",
            image: [
              {
                url: "http://somelink.com",
              }
            ],
            momentDate: "another date",
            title: "some name"
          }
        ]
      }
    };  
    
    axios.post.mockImplementation(() => {
      Promise.resolve(data);
    })
    
    await expect(fetchItems()).resolves.toEqual(data);
    // const items = await screen.findAllByRole('listitem');
    // render(<ImageList />);
    
    // expect(items).toHaveLength(4);
  })
})