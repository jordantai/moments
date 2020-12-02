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
    
    // request.mockImplementationOnce(() => {
    //   Promise.resolve({ data: { items: mockItems } })
    // });
    // render(<ImageList />);

    // const items = await screen.findAllByRole('listitem');
    // expect(items).toHaveLength(4);
    
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
})