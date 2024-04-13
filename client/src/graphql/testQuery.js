const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client');
const fetch = require('cross-fetch');

// Configure the ApolloClient with the correct endpoint and fetch implementation
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql', // your GraphQL endpoint
        fetch: fetch
    }),
    cache: new InMemoryCache()
});

// Define a GraphQL query that fetches the list of charities
const GET_CHARITIES = gql`
    query GetCharities {
        charities {
            id
            name
            description
            telephone
        }
    }
`;

// Function to execute the GraphQL query
async function fetchCharities() {
    try {
        const response = await client.query({
            query: GET_CHARITIES
        });
        console.log("Response from server:", response);
        console.log("Charities fetched successfully:", response.data.charities);
    } catch (error) {
        console.error("Error fetching charities:", error.message);
        console.log("Detailed error:", error.networkError ? error.networkError.result : error);
    }
}


// Call the function to test the query
fetchCharities();
