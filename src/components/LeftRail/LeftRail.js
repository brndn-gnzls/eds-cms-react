// src/components/LeftRail/LeftRail.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Accordion from "../Accordion/Accordion";
import styles from "./LeftRail.module.css";

const GET_LEFT_RAIL_ACCORDIONS = gql`
    query LeftRailAccordions(
        $accordionPagination: PaginationArg
        $urlPagination:       PaginationArg
    ) {
        leftRailAccordions(pagination: $accordionPagination) {
            documentId
            label
            links
            urls(pagination: $urlPagination) {
                linkName
                url
            }
        }
    }
`;

const staticLinkMap = {
    Design:  "/get-started/design",
    Develop: "/get-started/develop",
};

export default function LeftRail() {
    const { loading, error, data } = useQuery(GET_LEFT_RAIL_ACCORDIONS, {
        variables: {
            accordionPagination: { page: 1, pageSize: 100 },
            urlPagination:       { page: 1, pageSize: 100 },  // <- bump this to cover all your URLs
        },
    });
    const location = useLocation();

    if (loading) return <p>Loading Left Rail…</p>;
    if (error)   return <p>Error: {error.message}</p>;

    const accordions = data.leftRailAccordions || [];

    return (
        <div className={styles.leftRailWrapper}>
            {accordions.map(({ documentId, label, links, urls }) => {
                // Prefer structured urls if present
                let linkRoutes = [];
                if (urls && urls.length > 0) {
                    linkRoutes = urls.map(({ linkName, url }) => ({
                        label: linkName,
                        route: url.startsWith("/") ? url : `/${url}`,
                    }));
                } else if (links) {
                    // fallback to old newline-split
                    linkRoutes = links.split("\\n").map((raw) => {
                        const lbl = raw.replace(/\\n/g, "").trim();
                        return {
                            label: lbl,
                            route: staticLinkMap[lbl] || "#",
                        };
                    });
                }

                const shouldOpen = linkRoutes.some(
                    (lr) => lr.route === location.pathname
                );

                return (
                    <Accordion
                        key={documentId}
                        label={label}
                        links={linkRoutes}
                        defaultOpen={shouldOpen}
                        currentPath={location.pathname}
                    />
                );
            })}
        </div>
    );
}
