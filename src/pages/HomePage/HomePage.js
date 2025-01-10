// src/pages/HomePage/HomePage.js
import React from "react";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";

const HomePage = () => {
    return (
        <div className="container mx-auto flex flex-col min-h-screen">
            {/* Placeholder sections */}
            <section className="bg-gray-100 py-8 mb-4">
                <h1 className="text-3xl font-bold">Home Page Masthead</h1>
                <p className="mt-2">[ Future content goes here ]</p>
            </section>

            <section className="bg-white py-8 mb-4">
                <h2 className="text-2xl font-semibold">Marketing Section</h2>
                <p className="mt-2">[ Future content goes here ]</p>
            </section>

            <section className="bg-white py-8 flex-1">
                <h3 className="text-xl font-medium">Latest Updates</h3>
                <p className="mt-2">[ Future content goes here ]</p>
            </section>

            <GlobalFooter />
        </div>
    );
};

export default HomePage;
