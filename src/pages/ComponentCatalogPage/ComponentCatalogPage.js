// src/pages/ComponentCatalogPage/ComponentCatalogPage.js

import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import GettingHelpInternal from "../../components/GettingHelpInteral/GettingHelpInternal";
import styles from "./ComponentCatalogPage.module.css";
import { Link } from "react-router-dom";

// GraphQL queries as you specified
const GET_CATALOG_INVENTORIES = gql`
    query ComponentCatalogInventories($pagination: PaginationArg) {
        componentCatalogInventories(pagination: $pagination) {
            documentId
            imageUrl
            title
            description
            slug
        }
    }
`;

const GET_CATALOG_MASTHEAD = gql`
    query ComponentCatalogMasthead {
        componentCatalogMasthead {
            headline
            body
        }
    }
`;

const GET_GENERAL_H2_LOCKUP = gql`
    query GeneralH2Lockup {
        generalH2Lockup {
            headline
            body
        }
    }
`;

// The page
const ComponentCatalogPage = () => {
    // 1) Brand switch state (local)
    const [currentBrand, setCurrentBrand] = useState("Anthem");

    // 2) Apollo queries
    // a) fetch all inventory items with pagination = {pageSize: 100}
    const {
        loading: invLoading,
        error: invError,
        data: invData,
    } = useQuery(GET_CATALOG_INVENTORIES, {
        variables: { pagination: { pageSize: 100 } },
    });

    // b) fetch the masthead single type
    const {
        loading: mastLoading,
        error: mastError,
        data: mastData,
    } = useQuery(GET_CATALOG_MASTHEAD);

    // c) fetch the h2 lockup single type
    const {
        loading: h2Loading,
        error: h2Error,
        data: h2Data,
    } = useQuery(GET_GENERAL_H2_LOCKUP);

    // 3) Handle loading/errors
    if (invLoading || mastLoading || h2Loading) {
        return <p>Loading Component Catalog...</p>;
    }
    if (invError) return <p>Error: {invError.message}</p>;
    if (mastError) return <p>Error: {mastError.message}</p>;
    if (h2Error) return <p>Error: {h2Error.message}</p>;

    // 4) Extract data
    const inventoryItems = invData?.componentCatalogInventories || [];
    const mastheadData = mastData?.componentCatalogMasthead;
    const lockupData = h2Data?.generalH2Lockup;

    // 5) Filter inventory by brand prefix
    // (e.g. "anthem-", "healthyblue-", "wellpoint-")
    let brandPrefix = "anthem-";
    if (currentBrand === "Healthy Blue") brandPrefix = "healthyblue-";
    if (currentBrand === "Wellpoint") brandPrefix = "wellpoint-";

    const sortedItems = [...inventoryItems].sort((a, b) =>
        a.title.trim().localeCompare(b.title.trim())
    );

    const filteredItems = sortedItems.filter((item) =>
        item.imageUrl.includes(brandPrefix)
    );


    return (
        <>
            <GlobalNav
                showBrandSwitcher={true}
                currentBrand={currentBrand}
                onBrandChange={setCurrentBrand}
            />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className={styles.rightSide}>
                    <div>
                        {/* Masthead data => headline + body */}
                        <h1 style={{ paddingBottom: "16px" }}>
                            {mastheadData?.headline || "Overview"}
                        </h1>
                        <p style={{ paddingBottom: "32px" }}>
                            {mastheadData?.body ||
                                "An a-z component guide, featuring everything from basic elements..."}
                        </p>

                        <hr className={styles.line} />
                        <div style={{ height: "42px" }} />

                        {/* H2 lockup => "Components" heading + body */}
                        <h2 style={{ paddingBottom: "16px" }}>
                            {lockupData?.headline || "Components"}
                        </h2>
                        <p style={{ paddingBottom: "32px" }}>
                            {lockupData?.body ||
                                "Explore our scalable components below for detailed documentation..."}
                        </p>

                        {/* The 3-col grid with filtered items */}
                        <div className={styles.catalogGrid}>
                            {filteredItems.map((comp) => (
                                <div key={comp.documentId} className={styles.catalogItem}>
                                    {/* We'll do an <img> for brand image */}
                                    <div style={{ width: "200px", height: "126px" }}>
                                        <Link to={`/components/${comp.slug}`}>
                                        <img
                                            src={comp.imageUrl}
                                            alt={comp.title}
                                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        />
                                        </Link>
                                    </div>
                                    <p className={styles.itemName}>{comp.title}</p>
                                    <p className={styles.itemDesc}>
                                        {comp.description || "No description available"}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div style={{ height: "92px" }} />
                        <hr className={styles.line} />
                        <div style={{ height: "92px" }} />
                    </div>

                    {/* Additional content under the grid => 64px padding left, 192px bottom */}
                    <div>
                        <GettingHelpInternal />
                    </div>
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default ComponentCatalogPage;
