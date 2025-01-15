import React from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GettingStartedPath from "../../components/GettingStartedPath/GettingStartedPath";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import GettingHelp from "../../components/GettingHelp/GettingHelp";
import styles from "./GettingStartedPage.module.css";

const GettingStartedPage = () => {
    return (
        <>
            <GlobalNav />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className={`${styles.rightSide} min-h-screen`}>
                    <div
                        className={styles.banner}
                        style={{
                            backgroundImage: `url("/images/gettingStartedLanding/img-header-getstarted.jpg")`,
                        }}
                    >
                        <h1>Get Started</h1>
                        <p>
                            Get started with eDS to streamline your workflow and maintain consistency
                            across every aspect of our design system.
                        </p>
                    </div>

                    <div className={styles.postBannerSpace}/>
                    <div className={styles.introText}>
                        <h2>Choose your path</h2>
                        <p>Let's tailor your journey to fit your needs! Select the path that matches your role
                        to discover personalized tools, resources, and guidance that will help you make the most
                        of eDS.</p>
                    </div>

                    <div className={styles.contentArea}>
                        <GettingStartedPath
                            icon="/images/gettingStartedLanding/img-icon-getstarted-design.svg"
                            heading="Design"
                            body="As a designer, use the eDS to create engaging, unified user experiences with the
                tools needed for innovative products"
                        />

                        <GettingStartedPath
                            icon="/images/gettingStartedLanding/img-icon-getstarted-develop.svg"
                            heading="Develop"
                            body="As a developer, seamlessly integrate eDS into codebases for consistent brand experiences."
                        />
                    </div>
                    <GettingHelp/>
                </div>
            </div>
            <GlobalFooter/>
        </>
    );
};

export default GettingStartedPage;
