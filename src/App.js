import React, {useState} from 'react';
import {useQuery, gql, InMemoryCache} from "@apollo/client";

// GQL test query for articles with Title and Content.
// Fetch articles with pagination.
const GET_ARTICLES = gql`
    query GetArticles($start: Int, $limit: Int) {
        articles(pagination: {start: $start, limit: $limit}) {
            Title
            Content
        }
        articles_connection {
            pageInfo {
                total
            }
        }
    }
`;

function App() {
    // State to manage current page and pagination limits.
    const [page, setPage] = useState(1);
    const limit = 2;
    const start = (page - 1) * limit;

    // Use Apollo's useQuery hook to fetch the data.
    const { loading, error, data } = useQuery(GET_ARTICLES, {
        variables: {start, limit},
        cache: new InMemoryCache(),
    });

    // Handle the states.
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>

    // Total Number of articles.
    const totalArticles = data.articles_connection.pageInfo.total;

    // Total Number of pages.
    const totalPages = Math.ceil(totalArticles / limit);

    // Handle page navigation.
    const goToNextPage = () => setPage((prevPage) => prevPage + 1);
    const goToPreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div>
            <h1>Articles</h1>
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

            {/* Pagination Controls */}
            <div>
                <button onClick={goToPreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;