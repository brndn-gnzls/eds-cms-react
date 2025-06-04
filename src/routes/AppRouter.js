import React, { Suspense, lazy } from "react";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// Lazy load components
const ArticlePage = lazy(() => import("../pages/ArticlePage/ArticlePage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const TestPage = lazy(() => import("../pages/TestPage/TestPage"));
const GettingStartedPage = lazy(() => import("../pages/GettingStarted/GettingStartedPage"));
const GetStartedDevelop = lazy(() => import("../pages/GetStartedDevelop/GetStartedDevelopPage"));
const GetStartedDesign = lazy(() => import("../pages/GetStartedDesign/GetStartedDesignPage"));
const ComponentCatalogPage = lazy(() => import("../pages/ComponentCatalogPage/ComponentCatalogPage"));
const ComponentDetailPage = lazy(() => import("../pages/ComponentDetailPage/ComponentDetailPage"));

const AppRouter = () => {
    return (
        <Router>
            <ScrollToTop />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/articles/:articleUrl" element={<ArticlePage />} />
                    <Route path="/test-page" element={<TestPage />} />
                    <Route path="/get-started" element={<GettingStartedPage />} />
                    <Route path="/get-started/design" element={<GetStartedDesign />} />
                    <Route path="/get-started/develop" element={<GetStartedDevelop />} />
                    <Route path="/components" element={<ComponentCatalogPage />} />
                    <Route path="/components/:slug" element={<ComponentDetailPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;