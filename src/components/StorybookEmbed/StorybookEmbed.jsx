import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const toKebab = (s) =>
    String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const getComponentFromUrl = () => {
    try {
        const m = (window.location.hash || "").match(/#\/components\/([^/?#]+)/i);
        return m ? decodeURIComponent(m[1]) : null;
    } catch {
        return null;
    }
};

/**
 * Seed Storybook manager layout so the Controls panel starts taller.
 * We write to a few known keys (Storybook persists layout in localStorage).
 */
const seedStorybookPanelLayout = (opts = {}) => {
    const {
        panelPosition = "bottom",
        // you can pass either a ratio (0..1) or an absolute px height:
        bottomPanelHeightPx = 360,     // ~45% of 800px iframe; adjust to taste
        bottomPanelRatio,              // e.g., 0.45 if you prefer a ratio
    } = opts;

    // Compute a ratio if not supplied, relative to the current viewport.
    const ratio =
        typeof bottomPanelRatio === "number"
            ? Math.max(0.1, Math.min(0.9, bottomPanelRatio))
            : Math.max(0.1, Math.min(0.9, bottomPanelHeightPx / Math.max(window.innerHeight, 1)));

    // Common keys Storybook manager uses to persist layout (varies by version/theme)
    const candidateKeys = [
        "storybook-layout",
        "sb-layout",
        // Guard against namespaced variants some builds use:
        "__STORYBOOK_LAYOUT__",
    ];

    // Try writing in a couple of commonly-seen shapes
    const payloads = [
        // Shape A: Storybook has used a flat layout object with explicit bottom height
        JSON.stringify({
            panelPosition,
            // some builds use a pixel height, others use a ratio; we include both hints:
            bottomPanelHeight: Math.round(ratio * 1000) / 1000,
            bottomPanelPixels: Math.round(bottomPanelHeightPx),
        }),
        // Shape B: nested sizes map (seen in some builds)
        JSON.stringify({
            panelPosition,
            panelSizes: { bottom: Math.round(ratio * 1000) / 1000 },
        }),
    ];

    try {
        candidateKeys.forEach((key) => {
            payloads.forEach((value) => localStorage.setItem(key, value));
        });
    } catch {
        // ignore if storage is blocked
    }
};

const StorybookEmbed = ({
                            componentName = "auto",
                            story = "default",
                            height = 800,                                  // bump to 800
                            group = "components",
                            idOverride,
                            baseUrl = "http://172.17.0.1:5500/storybook",
                            // optional: tweak initial controls panel height on load
                            panelHeightPx = 260,                           // ~45% of the 800px iframe
                            hideNav = true,                                // keep the side nav hidden
                        }) => {
    // compute componentName from URL hash if "auto"
    const resolvedComponent = useMemo(() => {
        if (componentName && componentName !== "auto") return componentName;
        return getComponentFromUrl() || "button";
    }, [componentName]);

    const comp    = toKebab(resolvedComponent);
    const variant = toKebab(story || "default");
    const storyId = idOverride || `${toKebab(group)}-${comp}--${variant}`;

    // manager URL (NOT iframe.html) so Controls panel exists
    const params = new URLSearchParams({
        path: `/story/${storyId}`,
        viewMode: "story",
        addons: "1",
        nav: hideNav ? "0" : "1",         // 1) request nav off
        panelPosition: "bottom",          // 1) controls at bottom
    });
    const srcUrl = `${baseUrl}/?${params.toString()}`;

    // 1) seed localStorage so the manager starts with a taller bottom panel
    useEffect(() => {
        seedStorybookPanelLayout({ panelPosition: "bottom", bottomPanelHeightPx: panelHeightPx });
    }, [panelHeightPx]);

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 4,
                overflow: "hidden",
                margin: "1rem 0",
            }}
        >
            <iframe
                key={srcUrl} // force remount so new layout takes effect
                title={`storybook-${resolvedComponent}-${variant}`}
                src={srcUrl}
                height={height}
                width="100%"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
};

StorybookEmbed.propTypes = {
    componentName: PropTypes.string, // "auto" reads from #/components/<name>
    story:         PropTypes.string, // e.g. "default"
    height:        PropTypes.number, // iframe height (default 800)
    group:         PropTypes.string, // story title group (default "components")
    idOverride:    PropTypes.string, // force a full id if needed
    baseUrl:       PropTypes.string, // storybook base
    panelHeightPx: PropTypes.number, // initial height of Controls (bottom) in px
    hideNav:       PropTypes.bool,
};

export default StorybookEmbed;

// import React, { useMemo } from "react";
// import PropTypes from "prop-types";
//
// /** kebab-case helper (matches Storybook id slug rules closely enough for our use) */
// const toKebab = (s) =>
//     String(s)
//         .trim()
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/^-+|-+$/g, "");
//
// /** derive component name from URL hash like: #/components/<name> */
// const getComponentFromUrl = () => {
//     try {
//         const hash = window.location.hash || "";
//         // examples we support:
//         // #/components/button
//         // #/components/button?foo=bar
//         const match = hash.match(/#\/components\/([^/?#]+)/i);
//         return match ? decodeURIComponent(match[1]) : null;
//     } catch {
//         return null;
//     }
// };
//
// /**
//  * StorybookEmbed
//  * - loads the **manager UI** (so Controls are available)
//  * - positions Controls panel **bottom** and hides the **left nav**
//  * - derives component from the URL hash when componentName is "auto" or omitted
//  * - forces iframe remount when URL changes (key={srcUrl})
//  */
// const StorybookEmbed = ({
//                             componentName = "auto",
//                             story = "default",                     // most of our stories export `Default`
//                             group = "components",                  // matches story title "Components/<Comp>"
//                             idOverride,
//                             baseUrl = "http://172.17.0.1:5500/storybook",
//                             height = 800,                          // 2) bump to 800
//                         }) => {
//     // 3) derive the component from the URL when requested
//     const resolvedComponent = useMemo(() => {
//         if (componentName && componentName !== "auto") return componentName;
//         return getComponentFromUrl() || "button"; // sensible fallback
//     }, [componentName]);
//
//     const comp    = toKebab(resolvedComponent);
//     const variant = toKebab(story || "default");
//
//     // build story id: <group>-<component>--<variant> unless overridden
//     const storyId = idOverride || `${toKebab(group)}-${comp}--${variant}`;
//
//     // 1) use the **manager** URL (not iframe.html) so we get Controls,
//     //    and set UI params: controls bottom, hide left nav
//     //    (9.1 still honors these manager query params)
//     const params = new URLSearchParams({
//         path: `/story/${storyId}`,
//         viewMode: "story",
//         addons: "1",                // show addons panel
//         nav: "0",                   // hide left sidebar
//         panelPosition: "bottom",    // controls panel at bottom
//     });
//
//     const srcUrl = `${baseUrl}/?${params.toString()}`;
//
//     return (
//         <div
//             style={{
//                 border: "1px solid #ddd",
//                 borderRadius: 4,
//                 overflow: "hidden",
//                 margin: "1rem 0",
//             }}
//         >
//             <iframe
//                 key={srcUrl} // force remount when URL changes so we don't keep stale manager state
//                 title={`storybook-${resolvedComponent}-${variant}`}
//                 src={srcUrl}
//                 height={height}
//                 width="100%"
//                 frameBorder="0"
//                 allowFullScreen
//             />
//         </div>
//     );
// };
//
// StorybookEmbed.propTypes = {
//     /** pass "auto" (default) to read it from URL: #/components/<name> */
//     componentName: PropTypes.string,
//     /** named export (e.g., "default", "primary") */
//     story: PropTypes.string,
//     /** group portion of the story title ("Components" → "components") */
//     group: PropTypes.string,
//     /** override full story id if needed (e.g., "components-button--primary") */
//     idOverride: PropTypes.string,
//     /** base URL where Storybook is hosted (manager UI root) */
//     baseUrl: PropTypes.string,
//     /** iframe height */
//     height: PropTypes.number,
// };
//
// export default StorybookEmbed;