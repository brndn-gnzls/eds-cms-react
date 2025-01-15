// src/components/LeftRail/LeftRail.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "../Accordion/Accordion";
import styles from "./LeftRail.module.css";

/** Strapi query for leftRailAccordions */
const GET_LEFT_RAIL_ACCORDIONS = gql`
    query LeftRailAccordions {
        leftRailAccordions {
            documentId
            label
            links
        }
    }
`;

const LeftRail = () => {
    // 1) Execute the query
    const { loading, error, data } = useQuery(GET_LEFT_RAIL_ACCORDIONS);

    if (loading) return <p>Loading Left Rail...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // 2) Extract the array of accordions
    const leftRailAccordions = data?.leftRailAccordions || [];

    return (
        <div className={styles.leftRailWrapper}>
            {leftRailAccordions.map((accData, index) => {
                // "links" is a string with newline or slash-n. We split it to array
                const linkArray = accData.links
                    ? accData.links.split("\\n").map((s) => s.replace(/\\n/g, "").trim())
                    : [];

                return (
                    <Accordion
                        key={accData.documentId}
                        label={accData.label}
                        links={linkArray}
                    />
                );
            })}
        </div>
    );
};

export default LeftRail;
