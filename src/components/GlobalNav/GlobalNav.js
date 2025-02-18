// src/components/GlobalNav/GlobalNav.js

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./GlobalNav.module.css";
import MobileDrawer from "../MobileDrawer/MobileDrawer";

// This is the brand switcher logic from your code
const BRAND_ICONS = {
    Anthem: "/images/brandSwitcher/anthem-global-img-brand.svg",
    "Healthy Blue": "/images/brandSwitcher/healthyblue-global-img-brand.svg",
    Wellpoint: "/images/brandSwitcher/wellpoint-global-img-brand.svg",
};

const GlobalNav = ({
                       showBrandSwitcher = false,
                       currentBrand = "Anthem",
                       onBrandChange = () => {},
                   }) => {
    const [isLight, setIsLight] = useState(true);
    const handleToggle = () => setIsLight(!isLight);

    // NEW: track mobile drawer state
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Existing icons
    const githubIcon = "/images/globalNav/github.svg";
    const figmaIcon = "/images/globalNav/figma.svg";
    const lightIcon = "/images/globalNav/light.svg";
    const darkIcon = "/images/globalNav/dark.svg";

    // We'll show the brand switcher if `showBrandSwitcher` is true
    // On mobile, brand switcher is to the left of the hamburger with 16px gap

    // For the hamburger → X animation, we add a CSS class if isDrawerOpen is true
    // We'll animate using transforms in CSS.

    return (
        <>
            <header className={styles.navWrapper}>
                <div className={`container ${styles.navInner}`}>
                    {/* Left side: eDS Logo */}
                    <div className={styles.navLeft}>
                        <span className={styles.brandTitle}>eDS</span>
                    </div>

                    {/* Right side: brand switcher + icons + pipe + toggle */}
                    <div className={styles.navRight}>
                        {showBrandSwitcher && (
                            <BrandSwitcherDropdown
                                currentBrand={currentBrand}
                                onBrandChange={onBrandChange}
                            />
                        )}

                        {/* Only show hamburger below 768px in CSS (or keep it always, but it won't do anything on desktop) */}
                        <div
                            className={`${styles.hamburger} ${
                                isDrawerOpen ? styles.open : ""
                            }`}
                            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        >
                            {/* 3 bars, or animate to X */}
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        {/* The existing icons remain for desktop, also appear on mobile pinned in the bottom of the drawer.
                But we can keep them here if we want them in top nav on desktop. */}
                        <a href="https://github.com/" className={styles.iconLink}>
                            <img src={githubIcon} alt="GitHub" />
                        </a>
                        <a href="https://figma.com/" className={styles.iconLink}>
                            <img src={figmaIcon} alt="Figma" />
                        </a>
                        <span className={styles.pipe}>|</span>

                        <button className={styles.toggleBtn} onClick={handleToggle}>
                            <img
                                src={isLight ? lightIcon : darkIcon}
                                alt={isLight ? "Light Mode" : "Dark Mode"}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer (slides from right) */}
            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                isLight={isLight}
                githubIcon={githubIcon}
                figmaIcon={figmaIcon}
                lightIcon={lightIcon}
                darkIcon={darkIcon}
                // optional brand state or anything else
            />
        </>
    );
};

export default GlobalNav;

/**
 * Brand switcher purely visual:
 */
const BrandSwitcherDropdown = ({ currentBrand, onBrandChange }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);

    const brandIconSrc = BRAND_ICONS[currentBrand] || BRAND_ICONS["Anthem"];

    return (
        <div className={styles.brandSwitcher}>
            <button className={styles.brandButton} onClick={toggleOpen}>
                <img
                    src={brandIconSrc}
                    alt={currentBrand}
                    className={styles.brandButtonIcon}
                />
                {currentBrand} {open ? "˄" : "˅"}
            </button>

            {open && (
                <div className={styles.dropdownBox}>
                    <div
                        className={`${styles.brandRow} ${
                            currentBrand === "Anthem" ? styles.selectedBrand : ""
                        }`}
                        onClick={() => {
                            onBrandChange("Anthem");
                            setOpen(false);
                        }}
                    >
                        <img
                            src={BRAND_ICONS["Anthem"]}
                            alt="Anthem"
                            className={styles.brandRowIcon}
                        />
                        <span className={styles.brandRowText}>Anthem</span>
                    </div>

                    <hr className={styles.brandRowDivider} />
                    <p className={styles.medicaidLabel}>Medicaid</p>

                    <div
                        className={`${styles.brandRow} ${
                            currentBrand === "Healthy Blue" ? styles.selectedBrand : ""
                        }`}
                        onClick={() => {
                            onBrandChange("Healthy Blue");
                            setOpen(false);
                        }}
                    >
                        <img
                            src={BRAND_ICONS["Healthy Blue"]}
                            alt="Healthy Blue"
                            className={styles.brandRowIcon}
                        />
                        <span className={styles.brandRowText}>Healthy Blue</span>
                    </div>

                    <div
                        className={`${styles.brandRow} ${
                            currentBrand === "Wellpoint" ? styles.selectedBrand : ""
                        }`}
                        onClick={() => {
                            onBrandChange("Wellpoint");
                            setOpen(false);
                        }}
                    >
                        <img
                            src={BRAND_ICONS["Wellpoint"]}
                            alt="Wellpoint"
                            className={styles.brandRowIcon}
                        />
                        <span className={styles.brandRowText}>Wellpoint</span>
                    </div>
                </div>
            )}
        </div>
    );
};
