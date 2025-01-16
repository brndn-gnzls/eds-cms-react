import React from "react";
import { useQuery, gql } from "@apollo/client";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GettingStartedPath from "../../components/GettingStartedPath/GettingStartedPath";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import GettingHelp from "../../components/GettingHelp/GettingHelp";
import styles from "./GettingStartedPage.module.css";

/* Query for the page banner content */
const GET_GETTING_STARTED_PAGE = gql`
    query GettingStartedPage {
        gettingStartedPage {
            documentId
            heading
            body
        }
    }
`;

/* Query for the path components */
const GET_GETTING_STARTED_PATHS = gql`
    query GettingStartedPaths {
        gettingStartedPaths {
            documentId
            icon
            heading
            body
        }
    }
`;

const GettingStartedPage = () => {
    const {
        loading: pageLoading,
        error: pageError,
        data: pageData,
    } = useQuery(GET_GETTING_STARTED_PAGE);

    const {
        loading: pathsLoading,
        error: pathsError,
        data: pathsData,
    } = useQuery(GET_GETTING_STARTED_PATHS);

    if (pageLoading || pathsLoading) return <p>Loading Getting Started Page...</p>;
    if (pageError) return <p>Error: {pageError.message}</p>;
    if (pathsError) return <p>Error: {pathsError.message}</p>;

    const gsPage = pageData?.gettingStartedPage;
    const pathItems = pathsData?.gettingStartedPaths || [];

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
                        <h1>{gsPage.heading}</h1>
                        <p>{gsPage.body}</p>
                    </div>

                    <div className={styles.postBannerSpace} />

                    <div className={styles.introText}>
                        <h2>Choose your path</h2>
                        <p>
                            Let's tailor your journey to fit your needs! Select the path that
                            matches your role to discover personalized tools, resources, and
                            guidance that will help you make the most of eDS.
                        </p>
                    </div>

                    <div className={styles.contentArea}>
                        {pathItems.map((item) => {
                            // Decide link based on heading
                            let link = "/get-started"; // Fallback
                            if (item.heading === "Design") {
                                link = "/get-started/design";
                            } else if (item.heading === "Develop") {
                                link = "/get-started/develop";
                            }

                            return (
                                <GettingStartedPath
                                    key={item.documentId}
                                    icon={item.icon}
                                    heading={item.heading}
                                    body={item.body}
                                    link={link}
                                />
                            );
                        })}
                    </div>

                    <GettingHelp />
                </div>
            </div>

            <GlobalFooter />
        </>
    );
};

export default GettingStartedPage;
