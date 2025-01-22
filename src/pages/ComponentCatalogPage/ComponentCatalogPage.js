// src/pages/ComponentCatalogPage/ComponentCatalogPage.js

import React, { useState } from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import GettingHelpInternal from "../../components/GettingHelpInteral/GettingHelpInternal";
import styles from "./ComponentCatalogPage.module.css";

const mockComponents = [
    { id: 1, name: "Button", description: "A basic interactive button." },
    { id: 2, name: "Checkbox", description: "An input for boolean states." },
    { id: 3, name: "Text Field", description: "Single-line text input." },
    { id: 4, name: "Dropdown", description: "A select box for multiple options." },
    { id: 5, name: "Radio Button", description: "Mutually exclusive selection." },
    { id: 6, name: "Modal", description: "Overlays content in a dialog." },
    { id: 7, name: "Alert", description: "Displays urgent feedback messages." },
    { id: 8, name: "Card", description: "A container for grouped info." },
    { id: 9, name: "Tooltip", description: "Hover-based info overlay." },
    { id: 10, name: "Tabs", description: "Switches between different views." },
];

// brand => color
const brandColors = {
    Anthem: "gray",
    "Healthy Blue": "blue",
    Wellpoint: "orange",
};

const ComponentCatalogPage = () => {
    /** Local brand state => default = "Anthem" */
    const [currentBrand, setCurrentBrand] = useState("Anthem");

    return (
        <>
            <GlobalNav
                showBrandSwitcher={true}
                currentBrand={currentBrand}
                onBrandChange={setCurrentBrand}
            />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className={styles.rightSide}>
                    {/* 92px top margin */}
                    <div style={{ marginTop: "92px", marginLeft: "64px" }}>
                        <h1 style={{paddingBottom: "16px"}}>Overview</h1>
                        <p style={{paddingBottom: "32px"}} >
                            An a-z component guide, featuring everything from basic elements
                            to advanced UI, equipped with practical usage guidelines and best
                            practices.
                        </p>
                        <hr className={styles.line} />
                        <div style={{ height: "42px" }} />

                        <h2 style={{paddingBottom: "16px"}}>Components</h2>
                        <p style={{paddingBottom: "32px"}}>
                            Explore our scalable components below for detailed documentation,
                            includings specs, code snippets, and implementation tips.
                        </p>

                        {/* The 3-col grid */}
                        <div className={styles.catalogGrid}>
                            {mockComponents.map((comp) => {
                                const bgColor = brandColors[currentBrand] || "gray";
                                return (
                                    <div key={comp.id} className={styles.catalogItem}>
                                        <div
                                            style={{
                                                width: "200px",
                                                height: "126px",
                                                backgroundColor: bgColor,
                                            }}
                                        />
                                        <p className={styles.itemName}>{comp.name}</p>
                                        <p className={styles.itemDesc}>
                                            {comp.description || "lorem ipsum dolor nurit"}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ height: "92px" }} />
                        <hr className={styles.line} />
                        <div style={{ height: "92px" }} />
                    </div>
                    <div style={{paddingLeft: "64px", paddingBottom: "192px"}}>
                        <GettingHelpInternal/>
                    </div>
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default ComponentCatalogPage;
