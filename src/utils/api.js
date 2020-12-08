import axios from 'axios';

const OPENCAGE_API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

export const graphCmsEndpoint = 'https://api-eu-central-1.graphcms.com/v2/ckhxkvbov1mga01yycfpi764z/master';

export const openCageBaseUrl = 'https://api.opencagedata.com/geocode/v1/json';

export const fetchItems = (searchTerm, orderBy) => {
  return axios
    .post(graphCmsEndpoint, {
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
    })
    .catch((err) => {
      return Promise.reject(new Error(err));
    })
};

export const getItemBySlugQuery = `
      query GetItemBySlug($slug: String) {
        item(where: {slug: $slug}) {
          id
          title
          description
          image {
            url
          }
          location {
            latitude
            longitude
          }
          createdAt
          momentDate
        }
      }`;

export const fetchItem = async (slug) => {
  try {
    const data = await axios
      .post(graphCmsEndpoint, {
        query: `${getItemBySlugQuery}`,
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
  } catch (err) {
    return Promise.reject(new Error("error"));
  }
}

export const fetchLocation = (lat, lon) => {
  return axios
    .get(`${openCageBaseUrl}`, {
      params: {
        q: lat + `,` + lon,
        key: OPENCAGE_API_KEY
      }
    })
    .then(({ data: { results } }) => {
      return results;
    })
    .catch((err) => {
      return Promise.reject(new Error(err));
    })
};