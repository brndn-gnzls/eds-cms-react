// src/components/Accordion/Accordion.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Accordion.module.css";

export default function Accordion({
                                      label,
                                      links,
                                      defaultOpen = false,
                                      currentPath,
                                  }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useEffect(() => {
        setIsOpen(defaultOpen);
    }, [defaultOpen]);

    const toggleAccordion = () => setIsOpen((prev) => !prev);

    return (
        <div className={styles.accordionWrapper}>
            {/* Header row */}
            <div className={styles.headerRow} onClick={toggleAccordion}>
                <p
                    className={`${styles.headerLabel} ${
                        isOpen ? styles.open : ""
                    }`}
                >
                    {label}
                </p>
                <span
                    className={`${styles.caretIcon} ${
                        isOpen ? styles.caretDown : styles.caretRight
                    }`}
                />
            </div>

            {/* Links */}
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
                                    // prevent bogus “#” links
                                    if (route === "#") e.preventDefault();
                                    // fire your scroll‐reset (or any other) callback
                                    if (typeof onClick === "function") onClick();
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
}