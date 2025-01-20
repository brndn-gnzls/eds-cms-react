// src/components/Accordion/Accordion.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Accordion.module.css";

const Accordion = ({ label, links, defaultOpen = false, currentPath }) => {
    // If defaultOpen is true, we start isOpen as true.
    const [isOpen, setIsOpen] = useState(defaultOpen);

    // If you want the accordion to auto-update open/closed
    // if the route changes, you can watch defaultOpen in a useEffect:
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
                    className={styles.caret}
                    style={{
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                >
          ˃
        </span>
            </div>

            {isOpen && (
                <div className={styles.linksContainer}>
                    {links.map(({ label: linkLabel, route }, index) => {
                        // If route matches currentPath, highlight
                        const isActive = route === currentPath;

                        return (
                            <Link
                                key={index}
                                to={route}
                                className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                                onClick={(e) => {
                                    if (route === "#") e.preventDefault();
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
