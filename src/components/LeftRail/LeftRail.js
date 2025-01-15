
import React from "react";
import Accordion from "../Accordion/Accordion";
import styles from "./LeftRail.module.css";

const LeftRail = () => {
    const leftRailAccordions = [
        {
            label: "Get Started",
            links: ["Design", "Develop"],
        },
        {
            label: "Components",
            links: ["Overview", "Button", "Checkbox", "Links", "Text Field"],
        },
    ];

    return (
        <div className={styles.leftRailWrapper}>
            {/* Render each accordion in sequence */}
            {leftRailAccordions.map((accData, index) => (
                <Accordion
                    key={index}
                    label={accData.label}
                    links={accData.links}
                />
            ))}
        </div>
    );
};

export default LeftRail;
