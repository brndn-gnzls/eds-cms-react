// src/AppRouter.js
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
// 👇 We switch to HashRouter so all React routing lives in the hash
import {
    HashRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

const ArticlePage          = lazy(() => import("../pages/ArticlePage/ArticlePage"));
const HomePage             = lazy(() => import("../pages/HomePage/HomePage"));
const TestPage             = lazy(() => import("../pages/TestPage/TestPage"));
const GettingStartedPage   = lazy(() => import("../pages/GettingStarted/GettingStartedPage"));
const GetStartedDevelop    = lazy(() => import("../pages/GetStartedDevelop/GetStartedDevelopPage"));
const GetStartedDesign     = lazy(() => import("../pages/GetStartedDesign/GetStartedDesignPage"));
const ComponentCatalogPage = lazy(() => import("../pages/ComponentCatalogPage/ComponentCatalogPage"));
const ComponentDetailPage  = lazy(() => import("../pages/ComponentDetailPage/ComponentDetailPage"));

const AppRouter = () => {
    // On initial load (or hard refresh), if there's no hash
    // but we're on a sub-path, rewrite to the hash equivalent.
    useEffect(() => {
        const { pathname, search, hash } = window.location;
        // if user is NOT at the root and there's no # in the URL:
        if (pathname !== "/" && !hash) {
            // replace the URL with the hash-based version
            window.location.replace(`/#${pathname}${search}`);
        }
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <Suspense fallback={<div>Loading…</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/articles/:articleUrl" element={<ArticlePage />} />
                    <Route path="/test-page" element={<TestPage />} />
                    <Route path="/get-started" element={<GettingStartedPage />} />
                    <Route path="/get-started/design" element={<GetStartedDesign />} />
                    <Route path="/get-started/develop" element={<GetStartedDevelop />} />
                    <Route path="/components" element={<ComponentCatalogPage />} />
                    <Route path="/components/:slug" element={<ComponentDetailPage />} />

                    {/* any unknown route, send them home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;