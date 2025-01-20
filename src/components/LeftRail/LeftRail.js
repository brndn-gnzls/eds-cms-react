// src/components/LeftRail/LeftRail.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
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

const linkToPathMap = {
    Design: "/get-started/design",
    Develop: "/get-started/develop",
    // If you add more pages, just add them here.
};

const LeftRail = () => {
    const { loading, error, data } = useQuery(GET_LEFT_RAIL_ACCORDIONS);
    const location = useLocation();

    if (loading) return <p>Loading Left Rail...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const leftRailAccordions = data?.leftRailAccordions || [];

    return (
        <div className={styles.leftRailWrapper}>
            {leftRailAccordions.map((accData) => {
                // Convert each link label -> route
                const linkRoutes = accData.links
                    ? accData.links.split("\\n").map((raw) => {
                        const label = raw.replace(/\\n/g, "").trim();
                        const route = linkToPathMap[label] || "#";
                        return { label, route };
                    })
                    : [];

                // Determine if any linkRoutes matches the current location.pathname
                // If so, we want this accordion open by default.
                const shouldOpen = linkRoutes.some((lr) => lr.route === location.pathname);

                return (
                    <Accordion
                        key={accData.documentId}
                        label={accData.label}
                        links={linkRoutes}        // pass array of {label, route}
                        defaultOpen={shouldOpen}  // open if any link matches the current path
                        currentPath={location.pathname} // so Accordion can highlight the selected link
                    />
                );
            })}
        </div>
    );
};

export default LeftRail;
