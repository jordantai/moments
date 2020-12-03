import React from 'react';
import axios from 'axios';
import { act, render, screen } from '@testing-library/react';
import { fetchItems, endpoint } from '../utils/api';
import App from '../App';
import ImageList from '../components/ImageList';
import ItemCard from '../components/ItemCard';

jest.mock('axios');

beforeEach(() => {
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
})

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
                  url: "https://somelink.com",
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
    render(<App />);
    const header = await screen.findByRole('heading', {heading: 'Moments...'});
    expect(header).toBeInTheDocument();
  })
});

describe('ImageList', () => {
  test('renders ImageList component', async() => {
    render(<ImageList />); 
    const selector = await screen.findByLabelText(/order by/i);
    expect(selector).toBeInTheDocument();
    
  })
  test('displays list of api data', async () => {
    render(<ImageList />);
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(1);
  });
})
describe('<ItemCard />', () => {
  test('displays the correct data on each card', () => {
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
              },
            ],
            momentDate: "2017-12-20",
            title: "Title Name"
          }
        ]
      }  
    }    
    axios.post.mockResolvedValue({ data });

    render(<ItemCard />);
    //const imageUrl = screen.getByText('http://somelink.com');
    const title = screen.getByText(/Title Name/);
    const momentDate = screen.getByText('20/12/2017');
    //expect(imageUrl).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(momentDate).toBeInTheDocument();
  })
})