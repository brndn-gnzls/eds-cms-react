import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Lazy load components.
const ExamplePage = lazy(() => import('../pages/ExamplePage/ExamplePage'));
const ArticlePage = lazy(() => import('../pages/ArticlePage/ArticlePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const TestPage = lazy(() => import("../pages/TestPage/TestPage"));
const GettingStartedPage = lazy(() => import("../pages/GettingStarted/GettingStartedPage"));
const GetStartedDevelop = lazy(() => import("../pages/GetStartedDevelop/GetStartedDevelopPage"));
const GetStartedDesign = lazy(() => import("../pages/GetStartedDesign/GetStartedDesignPage"));

const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />}/>

                    {/* Protected Routes */}
                    <Route path="/example" element={
                        <ProtectedRoute>
                            <ExamplePage />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/articles" element={
                        <ProtectedRoute>
                            <ArticlePage />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/get-started" element={
                        <ProtectedRoute>
                            <GettingStartedPage />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/test-page" element={
                       <ProtectedRoute>
                           <TestPage />
                       </ProtectedRoute>
                    }
                    />
                    <Route path="/get-started/design" element={
                        <ProtectedRoute>
                            <GetStartedDesign/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/get-started/develop" element={
                        <ProtectedRoute>
                            <GetStartedDevelop/>
                        </ProtectedRoute>
                    }
                    />

                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRouter;
