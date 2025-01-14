import React, { useState } from "react";
import styles from "./Accordion.module.css";

const Accordion = ({ label, links = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
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
                    {links.map((linkText, idx) => (
                        <a href="#" className={styles.navLink} key={idx}>
                            &nbsp;&nbsp;{linkText}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Accordion;
