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
        { type: "h3", content: "Appearance" },
        {
            type: "p",
            content:
                "Each button type has distinct visual and functional traits to support various roles, from primary actions to subtle prompts. This section covers appearance options, states, and best practices to create a consistent, intuitive user experience.",
        },
        { type: "spacing", height: 24 },
        { type: "img", src: "img-button-options-desktop-light-001.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "Primary" },
        {
            type: "p",
            content:
                "For the principal call to action on the page. Primary buttons should only appear once per screen.",
        },
        { type: "img", src: "img-button-options-desktop-light-002.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "Secondary" },
        {
            type: "p",
            content:
                "Utilize the secondary button to offer alternatives to the main action, or in situations where all actions hold equal importance.",
        },
        { type: "img", src: "img-button-options-desktop-light-003.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "Tertiary / White" },
        {
            type: "p",
            content:
                "Employ the tertiary button for actions of lesser importance that offer convenience.",
        },
        { type: "img", src: "img-button-options-desktop-light-004.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "Ghost" },
        {
            type: "p",
            content: "Use the ghost button for secondary actions on colored backgrounds",
        },
        { type: "img", src: "img-button-options-desktop-light-004b.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "Two Line" },
        {
            type: "p",
            content: "A two-line button enables quick input changes with distinct actions.",
        },
        { type: "spacing", height: 72 },
        { type: "pBold", content: "Button States" },
        {
            type: "p",
            content:
                "Defining the visual and interactive variations of buttons, encompassing default, hover, focus, press, and disabled states to ensure consistent and intuitive user experiences.",
        },
        { type: "spacing", height: 16 },
        { type: "img", src: "img-button-options-desktop-light-007.svg" },
        { type: "spacing", height: 28 },
        { type: "img", src: "img-button-options-desktop-light-008.svg" },
        { type: "spacing", height: 28 },
        { type: "img", src: "img-button-options-desktop-light-009.svg" },
        { type: "spacing", height: 28 },
        { type: "img", src: "img-button-options-desktop-light-010.svg" },
        { type: "spacing", height: 28 },
        { type: "img", src: "img-button-options-desktop-light-011.svg" },
        { type: "spacing", height: 16 },
        { type: "pBold", content: "Default" },
        {
            type: "p",
            content:
                "The default state presents distinct and unique features for each button type, improving visibility and helping users recognize them as interactive elements.",
        },
        { type: "pBold", content: "Hover" },
        {
            type: "p",
            content:
                "The hover state activates when the cursor is over the button, providing visual feedback that it is clickable.",
        },
        { type: "pBold", content: "Focus" },
        {
            type: "p",
            content:
                "The focus state activates when the button receives focus, providing a visual cue to indicate it is selectable.",
        },
        { type: "pBold", content: "Press" },
        {
            type: "p",
            content:
                "The focus state activates when the button receives focus, providing a visual cue to indicate it is selectable.",
        },
        { type: "pBold", content: "Disabled" },
        {
            type: "p",
            content:
                "Buttons appear faded, showing no response to hover or click interactions.",
        },
        { type: "spacing", height: 72 },
        { type: "pBold", content: "Size" },
        {
            type: "p",
            content:
                "Understanding the appropriate usage of button sizes within an interface is crucial for maintaining hierarchy, ensuring accessibility, and enhancing user experience. Our design system provides four distinct sizes for buttons: Large, Medium, Small, and Extra Small.",
        },
        { type: "spacing", height: 16 },
        { type: "img", src: "img-button-options-desktop-light-012.svg" },
        { type: "spacing", height: 16 },
        {
            type: "pItalicSmall",
            content:
                "Each size is designed to accommodate different screen sizes, contexts, and user needs, ensuring a versatile and adaptable component library.",
        },
        {
            type: "p",
            content:
                "Size        Description                                   Height: 44px\n\n" +
                "Large       Large buttons are designed for high-          Font Size: 14px\n" +
                "            priority actions that require prominence.     Internal Padding: 48px\n\n" +
                "Small       Small buttons are used when space is          Height: 30px\n" +
                "            limited / actions that are less prioritized.  Font Size: 12px\n" +
                "                                                           Internal Padding: 30px",
        },
        { type: "spacing", height: 72 },
        { type: "pBold", content: "Icon" },
        {
            type: "p",
            content:
                "Icons in buttons enhance intuitiveness and appeal. Our design system allows leading and trailing icons, used independently for flexibility or together for richer interactions.",
        },
        { type: "spacing", height: 16 },
        { type: "img", src: "img-button-options-desktop-light-014.svg" },
        { type: "pBold", content: "Leading Icon" },
        {
            type: "p",
            content:
                "Leading icons are positioned before the text label in a button, effectively highlighting its purpose and aiding quick recognition.",
        },
        { type: "img", src: "img-button-options-desktop-light-015.svg" },
        { type: "pBold", content: "External Link / Trailing Icon" },
        {
            type: "p",
            content: "Trailing icons appear after the text label to denote an external link only",
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
        { type: "h2", content: "Metrics" },
        {
            type: "p",
            content:
                "Metrics are vital for ensuring consistency, usability, and visual harmony in user interfaces. They define dimensions and spacing guidelines, including height, width, padding, and font size. Adhering to these guidelines ensures elements are aesthetically pleasing, accessible, and functional across devices, creating a cohesive user experience.",
        },
        { type: "spacing", height: 32 },
        { type: "img", src: "img-button-metrics-desktop-light-001.svg" },
        { type: "pBold", content: "Large Button" },
        {
            type: "p",
            content:
                "Large buttons are designed for primary actions requiring prominence and ease of interaction, especially on larger touch targets.",
        },
        { type: "spacing", height: 24 },
        {
            type: "p",
            content:
                "• Height(bold): 45px\n" +
                "• Width(bold): Minimum 130px\n" +
                "• Padding(bold): 48px ↔; 11.5px ↕\n" +
                "• Font Size(bold): 14px",
        },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "Large buttons are best used for key actions such as primary call-to-actions on landing pages, forms, and modal dialogs.",
        },
        { type: "img", src: "img-button-metrics-desktop-light-002.svg" },
        { type: "pBold", content: "With Icon" },
        {
            type: "p",
            content:
                "Large buttons are designed for primary actions requiring prominence and ease of interaction, especially on larger touch targets.",
        },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "• Height: 46px\n" +
                "• Width: Minimum 130px\n" +
                "• Padding: 48px ↔; 12px ↕\n" +
                "• Font Size: 14px\n" +
                "• Icon Size: 20x20px, 10px spacing from text",
        },
        { type: "pBold", content: "Small Button" },
        {
            type: "p",
            content:
                "Small buttons are utilized for actions that are secondary or when space is limited, fitting neatly into compact areas.",
        },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "• Height: 30px\n" +
                "• Width: Minimum 90px\n" +
                "• Padding: 30px ↔; 7.5px ↕\n" +
                "• Font Size: 12px",
        },
        { type: "spacing", height: 16 },
        {
            type: "p",
            content:
                "Use small buttons for actions within lists, toolbars, or as secondary actions.",
        },
        { type: "spacing", height: 72 },
        { type: "hr" },
        { type: "spacing", height: 72 },
        { type: "h2", content: "Best Practices" },
        {
            type: "p",
            content:
                "Ensuring that buttons are effective in guiding user actions requires attention to detail in both design and implementation.",
        },
        { type: "spacing", height: 64 },
        {
            type: "bestPracticeDo",
            content: {
                title: "Use Clear and Concise Labeling",
                color: "#007032",
                body: "Do use actionable, precise language that clearly describes the button’s function.",
                img: "img-button-best-practices-desktop-light-001.svg",
            },
        },
        {
            type: "bestPracticeDo",
            content: {
                title: "Maintain Hierarchical Consistency",
                color: "#007032",
                body: "Do use button variants to establish visual hierarchies, reserving primary buttons for main actions.",
                img: "img-button-best-practices-desktop-light-003.svg",
            },
        },
        {
            type: "bestPracticeDo",
            content: {
                title: "Ensure Accessibility",
                color: "#007032",
                body: "Do design with adequate contrast and accessible labels, employing ARIA attributes where needed.",
                img: "img-button-best-practices-desktop-light-005.svg",
            },
        },
        {
            type: "bestPracticeDont",
            content: {
                title: "Avoid Using Vague or Long Labelling",
                color: "#BF1722",
                body: "Don't use ambiguous terms or lengthy descriptions that confuse users.",
                img: "img-button-best-practices-desktop-light-002.svg",
            },
        },
        {
            type: "bestPracticeDont",
            content: {
                title: "Avoid Multiple Primary Buttons",
                color: "#BF1722",
                body: "Don't clutter your interface with multiple primary buttons that dilute focus.",
                img: "img-button-best-practices-desktop-light-004.svg",
            },
        },
        {
            type: "bestPracticeDont",
            content: {
                title: "Avoid Unexplained Disabled Buttons",
                color: "#BF1722",
                body: "Don't use disabled buttons without explanation, which leads to user confusion.",
                img: "img-button-best-practices-desktop-light-006.svg",
            },
        },
        { type: "spacing", height: 92 },
        { type: "hr" },
        { type: "spacing", height: 92 },
        { type: "gettingHelpInternal" },
        { type: "spacing", height: 92 },
    ];
}