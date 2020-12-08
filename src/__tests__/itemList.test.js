import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchItems } from '../utils/api';
import ItemList from '../components/ItemList';

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

describe('ImageList', () => {
  test('displays sort select element and search input element', async() => {
    render(<ItemList />);
    const selectElement = await screen.findByDisplayValue('Date added DESC');
    expect(selectElement).toBeInTheDocument();
    const search = await screen.findByRole('textbox', {id: /search/i});
    expect(search).toBeInTheDocument();
  })
  test('displays list of api data', async () => {
    render(<ItemList />);
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(1);
    // renders each card title
    const title = await screen.findByRole('heading', { name: /Title Name/i });
    expect(title).toBeInTheDocument();
    // renders each card date
    const momentDate = await screen.findByText('20/12/2017');
    expect(momentDate).toBeInTheDocument();
  });
  test('list items are displayed if input in search box matches the item title', async() => {
    render(<ItemList />);
    const textbox = await screen.findByRole('textbox', {id: /search/i});
    userEvent.type(textbox, 'title');
    expect(textbox).toHaveValue('title');
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(1);
  })
})