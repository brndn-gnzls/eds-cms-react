// src/pages/GettingStartedPage/GettingStartedPage.js

import React from "react";
import { useQuery, gql } from "@apollo/client";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GettingStartedPath from "../../components/GettingStartedPath/GettingStartedPath";
import NotificationBox from "../../components/NotificationBox/NotificationBox";
import GettingHelp from "../../components/GettingHelp/GettingHelp";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./GettingStartedPage.module.css";

const GET_GETTING_STARTED_PAGE = gql`
    query GettingStartedPage {
        gettingStartedPage {
            heading
            body
            leadin {
                content
            }
            headline {
                headingLevel
                headingText
            }
            headerImage {
                folder
                fileName
            }
            notificationBox {
                borderColor
                content
            }
        }
    }
`;

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

export default function GettingStartedPage() {
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

    if (pageLoading || pathsLoading) return <p>Loading Getting Started Page…</p>;
    if (pageError) return <p>Error: {pageError.message}</p>;
    if (pathsError) return <p>Error: {pathsError.message}</p>;

    const gsPage = pageData.gettingStartedPage;
    const pathItems = pathsData.gettingStartedPaths || [];

    // headerImage comes back as an array; grab the first entry
    const headerImg =
        Array.isArray(gsPage.headerImage) && gsPage.headerImage.length > 0
            ? gsPage.headerImage[0]
            : {};
    const { folder = "", fileName = "" } = headerImg;
    // const bgUrl = folder && fileName ? `/images/${folder}/${fileName}` : undefined;
    const bgUrl = "images/gettingStartedLanding/img-header-getstarted.jpg";

    // decide which tag to use for the Strapi headline (h2, h3, etc.)
    const HeadingTag = gsPage.headline?.headingLevel || "h2";

    return (
        <>
            <GlobalNav />

            <div className={styles.containerRow}>
                <LeftRail />

                <div className={styles.rightSide}>
                    {/* Banner with dynamic background */}
                    <div
                        className={styles.banner}
                        style={bgUrl ? { backgroundImage: `url("${bgUrl}")` } : {}}
                    >
                        <h1>{gsPage.heading}</h1>
                        <p>{gsPage.body}</p>
                    </div>

                    <div className={styles.postBannerSpace} />

                    {/* Strapi-driven headline + lead-in */}
                    <div className={styles.introText}>
                        <HeadingTag>{gsPage.headline.headingText}</HeadingTag>
                        <p>{gsPage.leadin.content}</p>
                    </div>

                    {/* Notification Box(es) */}
                    {Array.isArray(gsPage.notificationBox) &&
                        gsPage.notificationBox.map((box, i) => (
                            <NotificationBox key={i} color={box.borderColor}>
                                <div dangerouslySetInnerHTML={{ __html: box.content }} />
                            </NotificationBox>
                        ))}

                    {/* Paths */}
                    <div className={styles.contentArea}>
                        {pathItems.map((item) => {
                            let link = "/get-started";
                            if (item.heading === "Design") link = "/get-started/design";
                            else if (item.heading === "Develop") link = "/get-started/develop";

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
}