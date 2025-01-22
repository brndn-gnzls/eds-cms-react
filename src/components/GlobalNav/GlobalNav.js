// src/components/GlobalNav/GlobalNav.js

import React, { useState } from "react";
import styles from "./GlobalNav.module.css";

const GlobalNav = ({
                       showBrandSwitcher = false,
                       currentBrand = "Anthem",
                       onBrandChange = () => {},
                   }) => {
    // Local mode state for light/dark toggle—unchanged
    const [isLight, setIsLight] = useState(true);
    const handleToggle = () => setIsLight(!isLight);

    // Existing icons
    const githubIcon = "/images/globalNav/github.svg";
    const figmaIcon = "/images/globalNav/figma.svg";
    const lightIcon = "/images/globalNav/light.svg";
    const darkIcon = "/images/globalNav/dark.svg";

    return (
        <header className={styles.navWrapper}>
            <div className={`container ${styles.navInner}`}>
                {/* Left side: eDS */}
                <div className={styles.navLeft}>
                    <span className={styles.brandTitle}>eDS</span>
                </div>

                {/* Right side: brand switcher (optional) + icons + pipe + toggle */}
                <div className={styles.navRight}>
                    {showBrandSwitcher && (
                        <BrandSwitcherDropdown
                            currentBrand={currentBrand}
                            onBrandChange={onBrandChange}
                        />
                    )}

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
    );
};

export default GlobalNav;

/**
 * Brand switcher purely visual:
 * We rely on currentBrand & onBrandChange from props.
 */
const BRAND_ICONS = {
    Anthem: "/images/brandSwitcher/anthem-global-img-brand.svg",
    "Healthy Blue": "/images/brandSwitcher/healthyblue-global-img-brand.svg",
    Wellpoint: "/images/brandSwitcher/wellpoint-global-img-brand.svg",
};

const BrandSwitcherDropdown = ({ currentBrand, onBrandChange }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);

    const brands = ["Anthem", "Healthy Blue", "Wellpoint"];

    // Derive the icon for the current brand
    const brandIconSrc = BRAND_ICONS[currentBrand] || BRAND_ICONS["Anthem"];

    return (
        <div className={styles.brandSwitcher}>
            {/* The button showing brand + caret */}
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
                    {/* Brand row: Anthem */}
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

                    {/* Healthy Blue */}
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


                    {/* Wellpoint */}
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
