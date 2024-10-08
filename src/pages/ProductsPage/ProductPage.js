import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from './ProductPage.module.css';

const GET_PRODUCTS = gql`
    query GetProducts {
        products {
            Name
            Description
            Price
            Image {
                url
            }
        }
    }
`;

const ProductPage = () => {
    const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE;

    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.productContainer}>
            <h1>Products</h1>
            <ul>
                {data.products.map((product, index) => (
                    <li key={index} className={styles.productItem}>
                        {product.Image && product.Image.url ? (
                            <img
                                src={`${STRAPI_BASE_URL}${product.Image.url}`}
                                alt={product.Name}
                                className={styles.productImage}
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                        <div className={styles.productDetails}>
                            <h2>{product.Name}</h2>
                            <div className={styles.productDescription}>
                                {product.Description.map((block, i) => (
                                    <p key={i}>
                                        {block.children.map((child, j) => (
                                            <span key={j}>{child.text}</span>
                                        ))}
                                    </p>
                                ))}
                            </div>
                            <p className={styles.productPrice}>Price: ${product.Price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default ProductPage;
