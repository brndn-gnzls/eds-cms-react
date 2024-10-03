import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from './App'

// Apollo Client config.
const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql', // This will need to be updated to prod URL.
    cache: new InMemoryCache(),
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