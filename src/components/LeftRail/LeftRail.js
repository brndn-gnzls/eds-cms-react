// src/components/LeftRail/LeftRail.js

import React from "react";
import Accordion from "../Accordion/Accordion";
import styles from "./LeftRail.module.css";

const LeftRail = () => {
    return (
        <div className={styles.leftRailWrapper}>
            <Accordion />
        </div>
    );
};

export default LeftRail;
