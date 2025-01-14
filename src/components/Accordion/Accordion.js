// src/components/Accordion/Accordion.js

import React, { useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.accordionWrapper}>
            {/* Header row */}
            <div className={styles.headerRow} onClick={toggleAccordion}>
                <p className={`${styles.headerLabel} ${isOpen ? styles.open : ""}`}>
                    Get Started
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
                    <a href="#" className={styles.navLink}>
                        &nbsp;&nbsp;Design
                    </a>
                    <a href="#" className={styles.navLink}>
                        &nbsp;&nbsp;Develop
                    </a>
                </div>
            )}
        </div>
    );
};

export default Accordion;
