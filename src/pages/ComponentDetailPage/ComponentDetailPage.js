// src/pages/ComponentDetailPage/ComponentDetailPage.js

import React, { useState } from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import styles from "./ComponentDetailPage.module.css";
import ComponentTabs from "../../components/ComponentTabs/ComponentTabs";

const ComponentDetailPage = () => {
    const [currentBrand, setCurrentBrand] = useState("Anthem");

    const bannerHeading = "Button";
    const bannerBody =
        "Buttons initiate actions, with their labels clearly indicating what will happen when interacted with by users, ensuring an intuitive user experience.";

    const tabsData = [
        {
            label: "Overview",
            blocks: getOverviewBlocks(),
        },
        {
            label: "Usage",
            blocks: [
                { type: "h2", content: "Usage (Placeholder)" },
                { type: "p", content: "Content for the 'Usage' tab will go here eventually." },
            ],
        },
        {
            label: "Accessibility",
            blocks: [
                { type: "h2", content: "Accessibility (Placeholder)" },
                { type: "p", content: "Content for the 'Accessibility' tab will go here eventually." },
            ],
        },
    ];

    return (
        <>
            <GlobalNav
                showBrandSwitcher
                currentBrand={currentBrand}
                onBrandChange={setCurrentBrand}
            />
            <div className="container mx-auto min-h-screen relative">
                <LeftRail />
                <div className={styles.rightSide}>
                    <ComponentTabs
                        currentBrand={currentBrand}
                        bannerHeading={bannerHeading}
                        bannerBody={bannerBody}
                        tabsData={tabsData}
                    />
                </div>
            </div>
            <GlobalFooter />
        </>
    );
};

export default ComponentDetailPage;

// FULL content. Partial filenames for images: "img-button-overview-desktop-light-001.svg" etc.
// Brand switching prepends "anthem-", "healthyblue-", or "wellpoint-".
function getOverviewBlocks() {
    return [

        { type: "spacing", height: 62 },
        { type: "h2", content: "Overview" },
        {
            type: "p",
            content:
                "Buttons capture users' attention and guide them toward important actions. Used selectively, they highlight essential CTAs without overwhelming users with too many focal points.",
        },
        { type: "spacing", height: 32 },
        { type: "img", src: "img-button-overview-desktop-light-001.svg" },
        { type: "spacing", height: 16 },
        {
            type: "pItalicSmall",
            content:
                "The above examples illustrate the different button types, showcasing how each design variation serves a specific purpose and ensures consistency in user interaction.",
        },
        { type: "spacing", height: 72 },
        { type: "h3", content: "Live Demo" },
        {
            type: "p",
            content:
                "Explore the full capabilities of our button components with our advanced demo. This interactive tool lets you customize variants, states, sizes, themes, colors, icons, and text, providing instant visual feedback and code generation for seamless project integration.",
        },
        { type: "spacing", height: 48 },
        { type: "demoPlaceholder" },
        { type: "spacing", height: 48 },
        { type: "h3", content: "Implementation Tips" },
        {
            type: "p",
            content:
                "• Consistency is Key: Maintain consistent use of button variants and sizes throughout your application for a cohesive user experience.\n" +
                "• Accessibility Matters: Regularly check color contrast and ensure accessible labeling, especially when using icons.\n" +
                "• Test Responsively: Utilize the mobile viewport preview to guarantee that buttons remain functional and visually appealing on all devices.",
        },
        { type: "spacing", height: 72 },
        { type: "hr" },
        { type: "spacing", height: 72 },
        { type: "h2", content: "Anatomy" },
        {
            type: "p",
            content:
                "Button anatomy is essential for effective interface design. Each element—icons, text labels, and background colors—enhances usability and appeal. This section provides insights into their roles and best practices.",
        },
        { type: "spacing", height: 16 },
        { type: "img", src: "img-button-anatomy-desktop-light-001.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "1. Icons" },
        {
            type: "p",
            content:
                "Icons serve as visual cues that support the text label, offering a quicker recognition of the action the button performs. They can be placed either before (leading) or after (trailing) the text to enhance the button's message. When using icons:",
        },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "• Size: Icons are standardized to ensure clear visibility without overpowering the label.\n" +
                "• Spacing: A set space is provided between the icon and label to prevent visual clutter, keeping focus on the button's message.\n" +
                "• Placement margins: Icons include preset left and right margins within the button to maintain a balanced, touch-friendly area.",
        },
        { type: "spacing", height: 24 },
        { type: "pBold", content: "2. Text Label" },
        {
            type: "p",
            content:
                "The text label provides a direct indication of what action will be performed when the button is clicked. Effective text labels are key to usability:",
        },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "• Font Family: The font is specified according to the selected brand, ensuring consistency with the brand's design language.\n" +
                "• Weight: Labels are set in bold for prominence and readability, complementing other interface elements.\n" +
                "• Size: The font size is preset based on the selected button size and accessibility requirements to ensure readability across all styles.\n" +
                "• Accessibility: Text and background colors are carefully selected to meet AAA contrast requirements, ensuring optimal readability and accessibility for all users.",
        },
        { type: "spacing", height: 24 },
        { type: "pBold", content: "3. Container" },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "The button's container and corner radius are essential in distinguishing it from other interface elements and influencing user perception. Design considerations include:",
        },
        {
            type: "p",
            content:
                "• Color: Button background colors are preset based on the selected brand, ensuring readability and accessibility while reflecting each button’s role within the color scheme.\n" +
                "• Corner Radius: The button style applies a brand-specific corner radius that aligns with each brand’s design language and overall system cohesion.\n" +
                "• Spacing: Button margins are preset to enhance visual balance and usability, ensuring sufficient clickability for all users.",
        },
        { type: "spacing", height: 72 },
        { type: "hr" },
        { type: "spacing", height: 72 },
        { type: "h2", content: "Options" },
        {
            type: "p",
            content:
                "In the pursuit of providing a flexible and cohesive user interface, our design system categorizes buttons into three distinct types based on their appearance and intended use: Primary, Secondary, and Tertiary.",
        },
        { type: "spacing", height: 72 },
        {
            type: "appearanceSection",
            // an array of block objects for the 5 appearances
            appearanceData: [
                {
                    imageSrc: "img-button-options-desktop-light-001.svg",
                    heading: "Primary",
                    description: "For the principal call to action on the page. Primary buttons should only appear once per screen."
                },
                {
                    imageSrc: "img-button-options-desktop-light-002.svg",
                    heading: "Secondary",
                    description: "Utilize the secondary button to offer alternatives to the main action, or in situations where all actions hold equal importance."
                },
                {
                    imageSrc: "img-button-options-desktop-light-003.svg",
                    heading: "Tertiary / White",
                    description: "Employ the tertiary button for actions of lesser importance that offer convenience."
                },
                {
                    imageSrc: "img-button-options-desktop-light-004.svg",
                    heading: "Ghost",
                    description: "Use the ghost button for secondary actions on colored backgrounds."
                },
                {
                    imageSrc: "img-button-options-desktop-light-004b.svg",
                    heading: "Two Line",
                    description: "A two-line button enables quick input changes with distinct actions."
                }
            ]
        },
        {
            type: "statesSection",
            heading: "Button States",
            introParagraph:
                "Defining the visual and interactive variations ... consistent and intuitive user experiences.",
            leftImages: [
                "img-button-options-desktop-light-005.svg",
                "img-button-options-desktop-light-006.svg",
                "img-button-options-desktop-light-007.svg",
                "img-button-options-desktop-light-008.svg",
                "img-button-options-desktop-light-009.svg"
            ],
            rightStates: [
                {
                    boldTitle: "Default",
                    paragraph:
                        "The default state presents distinct ... interactive elements."
                },
                {
                    boldTitle: "Hover",
                    paragraph:
                        "The hover state activates when ... that it is clickable."
                },
                {
                    boldTitle: "Focus",
                    paragraph:
                        "The focus state activates when ... to indicate it is selectable."
                },
                {
                    boldTitle: "Press",
                    paragraph:
                        "The focus state activates when ... to indicate it is selectable."
                },
                {
                    boldTitle: "Disabled",
                    paragraph:
                        "Buttons appear faded, showing no response to hover or click interactions."
                }
            ]
        },
        {
            type: "sizeSection",
            heading: "Size",
            introParagraph: "Understanding the appropriate usage of button sizes within an interface is crucial for maintaining hierarchy, ensuring accessibility, and enhancing user experience. Our design system provides four distinct sizes for buttons: Large, Medium, Small, and Extra Small.",
            imageSrc: "img-button-options-desktop-light-010.svg",
            italicParagraph: "Each size is designed to accommodate different screen sizes, contexts, and user needs, ensuring a versatile and adaptable component library.",
            tableHead: ["Size", "Description", ""],
            tableRows: [
                {
                    size: "Large",
                    description: "Large buttons are designed for high-priority actions that require prominence." +
                        "",
                    metrics: "Height: 44px\nFont Size: 14px\nInternal Padding: 48px"
                },
                {
                    size: "Small",
                    description: "Small buttons are used when space is limited / actions that are less prioritized.",
                    metrics: "Height: 30px\nFont Size: 12px\nInternal Padding: 30px"
                }
            ]
        },
        {
            type: "iconSection",
            heading: "Icon",
            introParagraph:
                "Icons in buttons enhance intuitiveness and appeal. Our design system allows leading and trailing icons, used independently for flexibility or together for richer interactions.",
            leftImageSrc: "img-button-options-desktop-light-011.svg",
            leftBoldTitle: "Leading Icon",
            leftParagraph:
                "Leading icons are positioned before the text label in a button, effectively highlighting its purpose and aiding quick recognition.",
            rightImageSrc: "img-button-options-desktop-light-012.svg",
            rightBoldTitle: "External Link / Trailing Icon",
            rightParagraph:
                "Trailing icons appear after the text label to denote an external link only"
        },
        { type: "spacing", height: 72 },
        { type: "pBold", content: "Implementation Considerations" },
        {
            type: "p",
            content:
                "By thoughtfully integrating icons into buttons, designers can leverage visual cues to enhance user understanding and engagement, enriching the user experience while maintaining a clean and coherent interface design.",
        },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "• Consistency: Use icons consistently across similar buttons to establish a recognizable pattern for users.\n" +
                "• Accessibility: Provide alternative text descriptions for icons to ensure that their purpose is communicated to users relying on screen readers.\n" +
                "• Visual Balance: Whether using leading, trailing, or combined icons, maintain a harmonious visual balance within the button to ensure that the text and icons are easily distinguishable and aesthetically pleasing.",
        },
        { type: "spacing", height: 72 },
        { type: "hr" },
        { type: "spacing", height: 72 },
        {
            type: "metricsSection",
            heading: "Metrics",
            introParagraph:
                "Metrics are vital ... creating a cohesive user experience.",
            row1Left: {
                imageSrc: "img-button-metrics-desktop-light-001.svg",
                boldTitle: "Large Button",
                description: "Large buttons are designed ... larger touch targets.",
                topSpacing: 24,  // space before bullet list
                bulletList: [
                    "Height(bold): 45px",
                    "Width(bold): Minimum 130px",
                    "Padding(bold): 48px ↔; 11.5px ↕",
                    "Font Size(bold): 14px"
                ],
                postBulletParagraph: "Large buttons are best used for key actions ... dialogs."
            },
            row1Right: {
                imageSrc: "img-button-metrics-desktop-light-002.svg",
                boldTitle: "Small Button",
                description: "Small buttons are utilized ... fitting neatly ...",
                topSpacing: 16,
                bulletList: [
                    "Height: 30px",
                    "Width: Minimum 80px",
                    "Padding: 30px ↔; 8px ↕",
                    "Font Size: 14px"
                ],
                postBulletParagraph: "Use small buttons for actions ... secondary actions."
            },
            row2Left: {
                imageSrc: "img-button-metrics-desktop-light-003.svg",
                boldTitle: "Large Button With Icon",
                description: "Large buttons w/icons are designed for ...",
                topSpacing: 16,
                bulletList: [
                    "Padding: 48px ↔; 12px ↕",
                    "Icon Size: 20x20px, 8px spacing from text"
                ]
                // optional postBulletParagraph if needed
            },
            row2Right: {
                imageSrc: "img-button-metrics-desktop-light-004.svg",
                boldTitle: "Small Button With Icon",
                description: "Small buttons with icons are utilized ...",
                topSpacing: 16,
                bulletList: [
                    "Height: 30px",
                    "Width: Minimum 80px",
                    "Padding: 30px ↔; 8px ↕",
                    "Icon Size: 16x16px, 4px spacing from text"
                ],
                postBulletParagraph: "Additional usage context for small button with icon."
            }
        },
        { type: "spacing", height: 64 },
        {
            type: "bestPracticesSection",
            heading: "Best Practices",
            introParagraph:
                "Ensuring that buttons are effective in guiding user actions requires attention ...",
            doItems: [
                {
                    title: "Use Clear and Concise Labeling",
                    color: "#007032",
                    symbol: "✓",
                    paragraph: "Do use actionable, precise language ...",
                    imageSrc: "img-button-best-practices-desktop-light-001.svg"
                },
                {
                    title: "Maintain Hierarchical Consistency",
                    color: "#007032",
                    symbol: "✓",
                    paragraph: "Do use button variants ... main actions.",
                    imageSrc: "img-button-best-practices-desktop-light-003.svg"
                },
                {
                    title: "Ensure Accessibility",
                    color: "#007032",
                    symbol: "✓",
                    paragraph: "Do design with adequate contrast ...",
                    imageSrc: "img-button-best-practices-desktop-light-005.svg"
                }
            ],
            dontItems: [
                {
                    title: "Avoid Using Vague or Long Labeling",
                    color: "#BF1722",
                    symbol: "✗",
                    paragraph: "Don't use ambiguous terms or lengthy descriptions ...",
                    imageSrc: "img-button-best-practices-desktop-light-002.svg"
                },
                {
                    title: "Avoid Multiple Primary Buttons",
                    color: "#BF1722",
                    symbol: "✗",
                    paragraph: "Don't clutter your interface with multiple primary ...",
                    imageSrc: "img-button-best-practices-desktop-light-004.svg"
                },
                {
                    title: "Avoid Unexplained Disabled Buttons",
                    color: "#BF1722",
                    symbol: "✗",
                    paragraph: "Don't use disabled buttons without explanation, ...",
                    imageSrc: "img-button-best-practices-desktop-light-006.svg"
                }
            ]
        },
        { type: "spacing", height: 92 },
        { type: "hr" },
        { type: "spacing", height: 92 },
        { type: "gettingHelpInternal" },
        { type: "spacing", height: 92 },
    ];
}