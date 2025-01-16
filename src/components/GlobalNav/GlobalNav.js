import React, { useState } from "react";
import styles from "./GlobalNav.module.css";

const GlobalNav = () => {
    const [isLight, setIsLight] = useState(true);

    const handleToggle = () => {
        setIsLight(!isLight);
    };

    const githubIcon = "/images/globalNav/github.svg";
    const figmaIcon = "/images/globalNav/figma.svg";
    const lightIcon = "/images/globalNav/light.svg";
    const darkIcon = "/images/globalNav/dark.svg";

    return (
        <header className={`${styles.navWrapper}`}>
            <div className={`container ${styles.navInner}`}>
                {/* Left side: eDS */}
                <div className={styles.navLeft}>
                    <span className={styles.brandTitle}>eDS</span>
                </div>

                {/* Right side: icons + pipe + toggle */}
                <div className={styles.navRight}>
                    <a href="https://github.com/" className={styles.iconLink}>
                        <img src={githubIcon} alt="GitHub" />
                    </a>
                    <a href="https://figma.com/" className={styles.iconLink}>
                        <img src={figmaIcon} alt="Figma" />
                    </a>
                    <span className={styles.pipe}>|</span>
                    {/* Toggle Icon */}
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