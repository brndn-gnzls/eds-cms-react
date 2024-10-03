import React from 'react';
import { useQuery, gql} from "@apollo/client";

// GQL test query for articles with Title and Content.
const GET_ARTICLES = gql`
    query GetArticles {
        articles {
            Title
            Content
        }
    }
`;

function App() {
    // Use Apollo's useQuery hook to fetch the data.
    const { loading, error, data } = useQuery(GET_ARTICLES)

    // Handle the states.
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h1>GraphQL Test</h1>
            <ul>
                {data.articles.map((article, index) => (
                    <li key={index}>
                        <h2>{article.Title}</h2>
                        {article.Content.map((contentBlock, blockIndex) => (
                            <div key={blockIndex}>
                                {contentBlock.children.map((child, childIndex) => (
                                    <p key={childIndex}>{child.text}</p>
                                ))}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;