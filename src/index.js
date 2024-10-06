import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import App from './App'
import {setContext} from "@apollo/client/link/context";
import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from "@sentry/react";

Sentry.init({
    dsn: 'https://69a40c264a8b244489b619435fb10e95@o4508077516128256.ingest.us.sentry.io/4508077519077376',
    integrations: [
        browserTracingIntegration({
            tracePropagationTargets: ["localhost", /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
});

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

// HTTP link to GraphQL endpoint.
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

// Authentication link including JWT in the headers.
const authLink = setContext((_, { headers }) => {
    // Get token from localStorage.
    const token = localStorage.getItem('token');

    // Return headers to the context and include the authorization header.
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// Apollo Client config.
const client = new ApolloClient({
    link: authLink.concat(httpLink),
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