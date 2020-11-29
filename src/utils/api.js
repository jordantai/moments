import request, { gql } from 'graphql-request';

const endpoint = 'https://api-eu-central-1.graphcms.com/v2/ckhxkvbov1mga01yycfpi764z/master';

export const fetchItems = async () => {
  const query = gql`
    query ItemsByTitle($searchItem: String) {
      items(where: {title_contains: $searchItem}) {
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
  `
  //  const query = gql`
  //   {
  //     items {
  //       id
  //       title
  //       description
  //       momentDate
  //       createdAt
  //       image {
  //         url
  //       }
  //     }
  //   }
  // `

  const variables = {
    searchItem: "pizza",
  }

  const data = await request(endpoint, query, variables)
  return data;
}