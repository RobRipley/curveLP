import { GraphQLClient, gql } from 'graphql-request';

export async function onRequest(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  const url = new URL(context.request.url);
  const poolId = url.searchParams.get('address');

  if (!poolId) {
    return new Response(
      JSON.stringify({ error: 'Missing address parameter' }),
      { status: 400, headers }
    );
  }

  const client = new GraphQLClient('https://gateway.thegraph.com/api/22ce431de4e820e107badbb8b62b3249/subgraphs/id/3fy93eAT56UJsRCEht8iFhfi6wjHWXtZ9dnnbQmvFopF');

  // Your existing GraphQL query and helper functions here
  // Copy them from your server.js file

  try {
    const data = await client.request(query, { poolId });
    // Your existing data processing logic here
    return new Response(
      JSON.stringify(data),
      { headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Error fetching data from The Graph', 
        details: error.message 
      }),
      { status: 500, headers }
    );
  }
}