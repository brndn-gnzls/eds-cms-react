import React from "react";
import { Link } from "react-router-dom";
import ArticleList from "../../components/ArticleList/ArticleList";
import styles from './ArticlePage.module.css'

const ArticlePage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Articles</h1>
            <Link to="/example" className={styles.backButton}>Back To Example Root</Link>
            <ArticleList />
        </div>
    )
}

export default ArticlePage;