// src/components/Accordion/Accordion.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Accordion.module.css";

const Accordion = ({ label, links, defaultOpen = false, currentPath }) => {
    // If defaultOpen is true, start open
    const [isOpen, setIsOpen] = useState(defaultOpen);

    // Sync accordion open state when route changes
    useEffect(() => {
        setIsOpen(defaultOpen);
    }, [defaultOpen]);

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={styles.accordionWrapper}>
            {/* Header row */}
            <div className={styles.headerRow} onClick={toggleAccordion}>
                <p className={`${styles.headerLabel} ${isOpen ? styles.open : ""}`}>
                    {label}
                </p>
                <span
                    className={`${styles.caretIcon} ${
                        isOpen ? styles.caretDown : styles.caretRight
                    }`}
                />
            </div>

            {isOpen && (
                <div className={styles.linksContainer}>
                    {links.map(({ label: linkLabel, route, onClick }, idx) => {
                        const isActive = route === currentPath;

                        return (
                            <Link
                                key={idx}
                                to={route}
                                className={`${styles.navLink} ${
                                    isActive ? styles.activeLink : ""
                                }`}
                                onClick={(e) => {
                                    // prevent dummy routes
                                    if (route === "#") {
                                        e.preventDefault();
                                        return;
                                    }
                                    // first run any passed-in callback (e.g. resetScroll)
                                    if (typeof onClick === "function") {
                                        onClick();
                                    }
                                    // then let the <Link> navigate normally
                                }}
                            >
                                &nbsp;&nbsp;{linkLabel}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Accordion;