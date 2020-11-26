import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api-eu-central-1.graphcms.com/v2/ckhxkvbov1mga01yycfpi764z/master';

export const client = new GraphQLClient(endpoint, { headers: {} });