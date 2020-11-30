import React from 'react';
import { render, act, screen } from '@testing-library/react';
import request, { gql } from 'graphql-request';
import { fetchItems } from '../utils/api';
import App from '../App';
import ImageList from '../components/ImageList';

jest.mock('graphql-request');

// const mockResponse = {
//   items: [
//     {
//       id: "ksdjhsjkgadjk",
//       createdAt: "some date",
//       description: "blah blah",
//       image: [
//         {
//           url: "http://somelink.com",
//         }
//       ],
//       momentDate: "another date",
//       title: "some name"
//     }
//   ]
// }

// const query = `
//   query getAllItems {
//     items {
//       id
//       createdAt
//       description
//       image {
//         url
//       }
//       momentDate
//       title
//     }
//   }
// `

// // mock graphql query
// graphql.query('getAllItems', (req, res, ctx) => {
//   return res(
//     ctx.data({
//       items: [
//         {

//         }
//       ]
//     })
//   )
// })



describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('Order by:')).toBeInTheDocument();
    expect(screen.getByText('Search Moments:')).toBeInTheDocument();
  })
});

describe('ImageList', () => {
  test('renders ImageList component', async () => {
    render(<ImageList />);
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  })
  test('should fetch items', () => {
    const items = [
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
    // const query = gql`
    //   query getAllItems {
    //     items {
    //       id
    //       createdAt
    //       description
    //       image {
    //         url
    //       }
    //       momentDate
    //       title
    //     }
    //   }
    // `
    const response = { items }
    request.mockResolvedValue(response);
    return fetchItems().then(items => expect(items).toEqual(items))
  })
})