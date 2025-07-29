// src/components/MobileDrawer/MobileDrawer.js

import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useLocation, Link } from "react-router-dom";
import styles from "./MobileDrawer.module.css";

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
    // Components
    Overview: "/components",
    Accordion: "/components/accordion",
    Alerts: "/components/alert",
    Badge: "/components/badge",
    Button: "/components/button",
    "Bar Graph": "/components/bar-graph",
    "Button Group": "/components/button-group",
    Checkbox: "/components/checkbox",
    Container: "/components/container",
    Divider: "/components/divider",
    Radio: "/components/radio",
    Dropdown: "/components/dropdown",
    "Left Navigation": "/components/left-navigation",
    Link: "/components/link",
    "Page Header": "/components/page-header",
    "Progress Bar": "/components/progress-bar",
    "Radio Button": "/components/radio-button",
    "Section Header": "/components/section-header",
    "Slide-In Panel": "/components/slide-in-panel",
    Tabs: "/components/tabs",
    "Text Field": "/components/text-field",
    Toggle: "/components/toggle",
    Tooltip: "/components/tooltip",

    // Get Started (already correct)
    Overview: "/get-started",
    Design: "/get-started/design",
    Develop: "/get-started/develop",
};


export default function MobileDrawer({
                                         isOpen,
                                         onClose,
                                         isLight,
                                         githubIcon,
                                         figmaIcon,
                                         lightIcon,
                                         darkIcon,
                                     }) {
    // Query the same data as LeftRail
    const { loading, error, data } = useQuery(GET_LEFT_RAIL_ACCORDIONS);
    const location = useLocation();

    const leftRailAccordions = data?.leftRailAccordions || [];

    if (loading) return null; // or a small spinner
    if (error) return null;

    // We'll apply a special class if `isOpen` is true
    return (
        <>
            {/* Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.showOverlay : ""}`}
                onClick={onClose}
            ></div>

            {/* Drawer itself */}
            <div className={`${styles.drawer} ${isOpen ? styles.openDrawer : ""}`}>
                {/* The top portion => can hold a heading or just the accordion */}
                <div className={styles.accordionWrapper}>
                    {leftRailAccordions.map((accData) => {
                        const labelText = accData.label.trim();

                        let linkRoutes = accData.links
                            ? accData.links
                                .split("\\n")
                                .map((raw) => {
                                    const label = raw.replace(/\\n/g, "").trim();

                                    // Conditionally handle "Overview" based on the parent accordion
                                    let route;
                                    if (label === "Overview") {
                                        if (labelText === "Components") route = "/components";
                                        else if (labelText === "Get Started") route = "/get-started";
                                        else route = "#";
                                    } else {
                                        route = linkToPathMap[label] || "#";
                                    }

                                    return { label, route };
                                })
                            : [];

                        // Pull the Overview link out to place it first
                        const overviewLink = linkRoutes.find(link => link.label === "Overview");
                        const otherLinks = linkRoutes.filter(link => link.label !== "Overview");

                        // Sort the remaining links alphabetically
                        otherLinks.sort((a, b) => a.label.localeCompare(b.label));

                        // Ensure Overview is first, followed by sorted links
                        linkRoutes = overviewLink ? [overviewLink, ...otherLinks] : otherLinks;

                        return (
                            <AccordionSection
                                key={accData.documentId}
                                label={labelText}
                                links={linkRoutes}
                                currentPath={location.pathname}
                            />
                        );
                    })}



                </div>

                {/* Pinned bottom row => GH + Figma left, toggle right */}
                <div className={styles.bottomRow}>
                    <div className={styles.bottomLeft}>
                        <a href="https://github.com/" className={styles.iconLink}>
                            <img src={githubIcon} alt="GitHub" />
                        </a>
                        <a href="https://figma.com/" className={styles.iconLink}>
                            <img src={figmaIcon} alt="Figma" />
                        </a>
                    </div>

                    <button className={styles.toggleBtn}>
                        <img
                            src={isLight ? lightIcon : darkIcon}
                            alt={isLight ? "Light Mode" : "Dark Mode"}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

function AccordionSection({ label, links, currentPath }) {
    // We'll just auto-open them all in mobile, or you can do an actual accordion.
    // For simplicity, let’s keep it open.
    // If you want an actual accordion, replicate the logic from your existing Accordion.
    return (
        <div className={styles.mobileAccordionWrapper}>
            <p className={styles.accordionLabel}>{label}</p>
            <div className={styles.mobileLinks}>
                {links.map((link, i) => {
                    const isActive = link.route === currentPath;
                    return (
                        <Link
                            key={i}
                            to={link.route}
                            className={`${styles.mobileLink} ${
                                isActive ? styles.activeLink : ""
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
