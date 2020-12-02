// import request, { gql } from 'graphql-request';
const axios = require('axios');

const endpoint = 'https://api-eu-central-1.graphcms.com/v2/ckhxkvbov1mga01yycfpi764z/master';

// export const fetchItems = async (searchTerm, orderBy) => {
//   const query = gql`
//     query ItemsByTitle($searchItem: String, $order: ItemOrderByInput) {
//       items(where: {title_contains: $searchItem}, orderBy: $order ) {
//         id
//         title
//         description
//         momentDate
//         createdAt
//         image {
//           url
//         }
//       }
//     }
//   `

export const fetchItems = async (searchTerm, orderBy) => {
  const { data } = await axios.post(endpoint, {
    query: `
        query ItemsByTitle($searchItem: String, $order: ItemOrderByInput) {
          items(where: {title_contains: $searchItem}, orderBy: $order ) {
            id
            title
            description
            momentDate
            createdAt
            image {
              url
            }
          }
        }
      `,
    variables: {
      searchItem: searchTerm,
      order: orderBy
    }
  },
    {
      headers: {
      'Content-Type': 'application/json'
    }
    })
  
  return data;
      


  // const variables = {
  //   searchItem: searchTerm,
  //   order: orderBy
  // }
  
  // const data = await request(endpoint, query, variables);
  // return data;
}