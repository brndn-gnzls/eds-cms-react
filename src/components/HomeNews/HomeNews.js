// src/components/HomeNews/HomeNews.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./HomeNews.module.css";

// Single type for top heading/paragraph
const GET_HOME_NEWS_TOP = gql`
    query GetHomeNewsTop {
        homeNewsTop {
            topHeading
            topParagraph
        }
    }
`;

// Collection type for multiple articles (no nested data/attributes)
const GET_NEWS_ARTICLES = gql`
    query GetNewsArticles {
        newsArticles {
            documentId
            storyImageUrl
            storyHeading
            storyBody
            authorInfo
        }
    }
`;

const HomeNews = () => {
    // 1) Fetch top heading/paragraph
    const {
        loading: topLoading,
        error: topError,
        data: topData,
    } = useQuery(GET_HOME_NEWS_TOP);

    // 2) Fetch multiple articles
    const {
        loading: articlesLoading,
        error: articlesError,
        data: articlesData,
    } = useQuery(GET_NEWS_ARTICLES);

    if (topLoading || articlesLoading) return <p>Loading Latest Updates...</p>;
    if (topError) return <p>Error (top lockup): {topError.message}</p>;
    if (articlesError) return <p>Error (articles): {articlesError.message}</p>;

    // Extract top heading/paragraph from single type
    const { topHeading, topParagraph } = topData.homeNewsTop;

    // Extract array of news articles from collection
    const articles = articlesData.newsArticles || [];

    return (
        <section className={styles.newsWrapper}>
            {/* Top Lock-up */}
            <div className={styles.topLockup}>
                <h2>{topHeading}</h2>
                <p>{topParagraph}</p>
            </div>

            {/* Render each article lockup */}
            {articles.map((item) => {
                const {
                    documentId,
                    storyImageUrl,
                    storyHeading,
                    storyBody,
                    authorInfo,
                } = item;

                return (
                    <div key={documentId} className={styles.newsStory}>
                        <div
                            className={styles.newsImage}
                            style={{
                                backgroundImage: `url(${storyImageUrl})`,
                            }}
                        />
                        <div className={styles.newsText}>
                            <h2>{storyHeading}</h2>
                            <p>{storyBody}</p>
                            <div className={styles.bottomBorder} />
                            <p>{authorInfo}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default HomeNews;
