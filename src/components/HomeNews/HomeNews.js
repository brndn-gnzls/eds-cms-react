// src/components/HomeNews/HomeNews.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import styles from "./HomeNews.module.css";

// 1) Top heading/paragraph stays the same
const GET_HOME_NEWS_TOP = gql`
    query GetHomeNewsTop {
        homeNewsTop {
            topHeading
            topParagraph
        }
    }
`;

// 2) Updated articles query to pull in `thumbnail`
const GET_ARTICLES = gql`
    query GetArticles {
        articles {
            url
            title
            thumbnail
            articleAuthorName
            articleAuthorRole
            articleComposition {
                ... on ComponentSharedBlocksParagraphHeadline {
                    headline
                }
            }
        }
    }
`;
export default function HomeNews() {
    // fetch top lock-up
    const {
        loading: topLoading,
        error: topError,
        data: topData,
    } = useQuery(GET_HOME_NEWS_TOP);

    // fetch articles with thumbnail
    const {
        loading: articlesLoading,
        error: articlesError,
        data: articlesData,
    } = useQuery(GET_ARTICLES);

    if (topLoading || articlesLoading) return <p>Loading Latest Updates…</p>;
    if (topError) return <p>Error (top lockup): {topError.message}</p>;
    if (articlesError) return <p>Error (articles): {articlesError.message}</p>;

    const { topHeading, topParagraph } = topData.homeNewsTop;
    const articles = articlesData.articles || [];

    return (
        <section className={styles.newsWrapper}>
            {/* Top Lock-up */}
            <div className={styles.topLockup}>
                <h2>{topHeading}</h2>
                <p>{topParagraph}</p>
            </div>

            {/* Article List */}
            {articles.map((article) => {
                const {
                    url,
                    title,
                    thumbnail,
                    articleAuthorName,
                    articleAuthorRole,
                    articleComposition,
                } = article;

                // Use thumbnail for the small listing image
                const storyImageUrl = thumbnail
                    ? `/${thumbnail.replace(/^\/+/, "")}`
                    : "";

                // first ParagraphHeadline block for storyBody
                const headlineBlock = (articleComposition || []).find(
                    (b) => b.headline
                );
                const storyBody = headlineBlock ? headlineBlock.headline : "";

                return (
                    <div key={url} className={styles.newsStory}>
                        <Link to={`/articles/${url}`}>
                            <div
                                className={styles.newsImage}
                                style={{
                                    backgroundImage: storyImageUrl
                                        ? `url("${storyImageUrl}")`
                                        : "none",
                                }}
                            />
                        </Link>

                        <div className={styles.newsText}>
                            <Link to={`/articles/${url}`}>
                                <h2>{title}</h2>
                            </Link>
                            <p>{storyBody}</p>
                            <div className={styles.bottomBorder} />
                            <p>
                                <strong>{articleAuthorName}</strong>{" "}
                                {articleAuthorRole}
                            </p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}