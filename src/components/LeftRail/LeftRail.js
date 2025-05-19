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
            urlPagination:       { page: 1, pageSize: 100 },
        },
    });
    const location = useLocation();

    if (loading) return <p>Loading Left Rail…</p>;
    if (error)   return <p>Error: {error.message}</p>;

    const accordions = data.leftRailAccordions || [];

    // this will scroll both the window and any [data-main-content] container
    const resetScroll = () => {
        // top of window
        window.scrollTo(0, 0);
        // if you have an inner div with data-main-content
        const content = document.querySelector("[data-main-content]");
        if (content) content.scrollTop = 0;
    };

    return (
        <div className={styles.leftRailWrapper}>
            {accordions.map(({ documentId, label, links, urls }) => {
                let linkRoutes = [];

                if (urls && urls.length > 0) {
                    linkRoutes = urls.map(({ linkName, url }) => ({
                        label: linkName,
                        route: url.startsWith("/") ? url : `/${url}`,
                        onClick: resetScroll,
                    }));
                } else if (links) {
                    linkRoutes = links.split("\\n").map((raw) => {
                        const lbl = raw.replace(/\\n/g, "").trim();
                        return {
                            label: lbl,
                            route: staticLinkMap[lbl] || "#",
                            onClick: resetScroll,
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