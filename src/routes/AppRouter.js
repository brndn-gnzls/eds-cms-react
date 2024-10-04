import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Lazy load components.
const ExamplePage = lazy(() => import('../pages/ExamplePage/ExamplePage'));
const ArticlePage = lazy(() => import('../pages/ArticlePage/ArticlePage'));

const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/example" element={<ExamplePage />}/>
                    <Route path="/articles" element={<ArticlePage />}/>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRouter;
