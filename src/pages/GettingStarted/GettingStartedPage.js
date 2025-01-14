import React from "react";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import LeftRail from "../../components/LeftRail/LeftRail";

const GettingStartedPage = () => {
    return (
        <>
            <GlobalNav />

            <div className="container mx-auto min-h-screen relative">
                <LeftRail />

                <div className="ml-[300px] p-8 min-h-screen">
                    <h1 className="text-2xl font-bold mb-4">Getting Started Landing Page</h1>
                    <p>This is the scrollable area on the right side.</p>
                    <p>
                        Because the left rail is fixed, we offset this content with
                        <code>ml-[300px]</code>.
                    </p>
                    <p>
                        Add more content here. The browser window will scroll this area,
                        while the left rail remains pinned in place.
                    </p>
                </div>
            </div>
        </>
    );
};

export default GettingStartedPage;

