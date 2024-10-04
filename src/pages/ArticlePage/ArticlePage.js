import React from "react";
import ArticleList from "../../components/ArticleList/ArticleList";
import styles from './ArticlePage.module.css'

const ArticlePage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Articles</h1>
            <ArticleList />
        </div>
    )
}

export default ArticlePage;