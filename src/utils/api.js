import axios from 'axios';

const endpoint = 'https://api-eu-central-1.graphcms.com/v2/ckhxkvbov1mga01yycfpi764z/master';

export const fetchItems = (searchTerm, orderBy) => {
  return axios
    .post(endpoint, {
      query: `
        query ItemsByTitle($searchItem: String, $order: ItemOrderByInput) {
          items(where: {title_contains: $searchItem}, orderBy: $order ) {
            id
            title
            description
            momentDate
            createdAt
            slug
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
    .then(({ data }) => {
      const { data: { items } } = data;
      return items;
    });
};

export const fetchItem = async (slug) => {
  const data = await axios
    .post(endpoint, {
      query: `
      query GetItemBySlug($slug: String) {
        item(where: {slug: $slug}) {
          id
          title
          description
          image {
            url
          }
          createdAt
          momentDate
        }
      }`,
      variables: {
        slug: slug
      }
    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
  return data.data;
}