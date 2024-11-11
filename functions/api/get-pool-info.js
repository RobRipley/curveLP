import { GraphQLClient, gql } from 'graphql-request';

export async function onRequest(context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
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

  // Initialize GraphQL client
  const client = new GraphQLClient('https://gateway.thegraph.com/api/22ce431de4e820e107badbb8b62b3249/subgraphs/id/3fy93eAT56UJsRCEht8iFhfi6wjHWXtZ9dnnbQmvFopF');

  // Helper functions (copy your existing helper functions here)
  function formatBalance(balance, decimals) {
    try {
        const divisor = BigInt(10) ** BigInt(decimals);
        return (BigInt(balance) / divisor).toString();
    } catch (error) {
        console.error("Error formatting balance:", error);
        return "0";
    }
  }

  function calculatePercentChange(current, previous) {
    if (!previous || previous === '0') return '0';
    return (((parseFloat(current) - parseFloat(previous)) / parseFloat(previous)) * 100).toFixed(2);
  }

  function aggregateProviders(deposits, withdraws) {
    // Copy your existing aggregateProviders function here
    // ... (Your existing implementation)
  }

  // Your existing GraphQL query
  const query = gql`
    // Copy your existing GraphQL query here
    // ... (Your existing query)
  `;

  try {
    const data = await client.request(query, { poolId });
    // Copy your existing data processing logic here
    // ... (Your existing implementation)

    return new Response(
      JSON.stringify({
        // Your formatted response data here
        // ... (Copy your existing response structure)
      }),
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