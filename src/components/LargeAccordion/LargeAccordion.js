import React, { useState } from "react";
import styles from "./LargeAccordion.module.css";

const PLACEHOLDER_DATA = [
    {
        id: 0,
        label: "FAQ #1: Lorem question?",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Suspendisse eget eros hendrerit, porttitor risus in, interdum turpis. 
Aliquam non tempus metus, ac efficitur mi. 
Vestibulum consectetur erat non urna semper, at ultricies mauris tempus. 
Ut sit amet interdum dolor.`,
    },
    {
        id: 1,
        label: "FAQ #2: More lorem details?",
        content: `Cras non ullamcorper ex, nec egestas lorem. 
Phasellus ornare, arcu id bibendum ultricies, quam tellus mollis nunc, 
quis posuere lacus nibh vel risus. 
Sed vel tempus nulla, eget pretium risus. 
Praesent ut arcu elementum, porta libero sed, lobortis libero.`,
    },
    {
        id: 2,
        label: "FAQ #3: Implementation approach?",
        content: `Duis venenatis augue id ornare cursus. 
Curabitur pharetra risus et lorem convallis, nec aliquam odio dictum. 
Nam finibus libero eu tortor dictum, non feugiat sapien blandit. 
Etiam feugiat augue eget sem tincidunt aliquet. 
Proin sodales pharetra massa, eget auctor libero lobortis eget.`,
    },
    {
        id: 3,
        label: "FAQ #4: Another question here?",
        content: `Mauris vitae orci nec lorem volutpat pellentesque. 
In faucibus lorem eget arcu convallis, sed cursus magna cursus. 
Integer a sapien a ipsum tempus consectetur. 
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. 
Vestibulum a dapibus neque, vel porta mauris.`,
    },
    {
        id: 4,
        label: "FAQ #5: Last sample question?",
        content: `Sed iaculis justo et condimentum elementum. 
Morbi pretium, sapien in tempor tincidunt, ex ipsum tempus libero, 
a molestie leo massa nec mauris. 
Curabitur luctus massa sed sem vehicula, nec mattis sem aliquet. 
Sed risus quam, venenatis id diam eget, blandit porttitor ante. 
Phasellus nec ullamcorper dolor.`,
    },
];

const LargeAccordion = () => {
    const [openIds, setOpenIds] = useState([]);

    const handleToggle = (itemId) => {
        if (openIds.includes(itemId)) {
            setOpenIds(openIds.filter((id) => id !== itemId));
        } else {
            setOpenIds([...openIds, itemId]);
        }
    };

    return (
        <div className={styles.accordionWrapper}>
            {PLACEHOLDER_DATA.map((item) => {
                const isOpen = openIds.includes(item.id);

                return (
                    <div key={item.id} className={styles.accordionRow}>
                        <div
                            className={styles.labelRow}
                            onClick={() => handleToggle(item.id)}
                        >
                            <span className={styles.labelText}>{item.label}</span>
                            <span className={styles.icon}>{isOpen ? "–" : "+"}</span>
                        </div>

                        {/* The content area (animated open/close) */}
                        <div
                            className={`${styles.contentArea} ${isOpen ? styles.open : ""}`}
                            style={{
                                maxHeight: isOpen ? "1000px" : "0px",
                            }}
                        >
                            <p>{item.content}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LargeAccordion;
