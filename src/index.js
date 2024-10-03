import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from './App'

// Define cache type policies to handle pagination correctly
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                articles: {
                    keyArgs: ['pagination'], // Treat each pagination page as a separate query
                },
            },
        },
    },
});

// Apollo Client config.
const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT, // This will need to be updated to prod URL.
    cache,
});

// Apollo Provider for client.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);