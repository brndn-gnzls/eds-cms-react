import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// Lazy load components.
const ExamplePage = lazy(() => import('../pages/ExamplePage/ExamplePage'));
const ArticlePage = lazy(() => import('../pages/ArticlePage/ArticlePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ProductPage = lazy(() => import('../pages/ProductPage/ProductPage'))

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
                    <Route path="/products" element={
                        <ProtectedRoute>
                            <ProductPage />
                        </ProtectedRoute>
                    }
                    />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AppRouter;
