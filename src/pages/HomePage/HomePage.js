import React from "react";
import GlobalFooter from "../../components/GlobalFooter/GlobalFooter";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import HomeMasthead from "../../components/HomeMasthead/HomeMasthead";
import HomeMarketing from "../../components/HomeMarketing/HomeMarketing";


const HomePage = () => {
    return (
        <>
            <GlobalNav />

            {/* Main page content (constrained to .container) */}
            <div className="container mx-auto flex flex-col min-h-screen">
                <HomeMasthead />
                <HomeMarketing />

                <section className="bg-white py-8 flex-1">
                    <h3 className="text-xl font-medium">Latest Updates</h3>
                    <p className="mt-2">[ Future content goes here ]</p>
                </section>
            </div>

            <GlobalFooter />
        </>
    );
};

export default HomePage;
