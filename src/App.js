import React, { useState, useEffect } from 'react';
import axios from "axios";

function App() {
    const [articles, setArticles] = useState([]);

    // runs when the component loads, making a GET request to Strapi's
    // /api/articles endpoint.
    useEffect(() => {
        axios.get('http://localhost:1337/api/articles')
            .then(response => {
                // articles are stored in the articles state using setArticles.
                setArticles(response.data.data)
            })
            .catch(error => {
                console.error('[-] Error fetching articles from Strapi: ', error);
            });
    }, []);

    // articles are mapped over to display the title and content from the
    // attributes of each article.
    return (
        <div>
            <h1>Strapi React Configuration</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        <h2>{article.Title}</h2>
                        {article.Content.map((contentBlock, index) => (
                            contentBlock.children.map((child, childIndex) => (
                                <p key={`${index}-${childIndex}`}>{child.text}</p>
                            ))
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App;