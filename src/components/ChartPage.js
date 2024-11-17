import React from "react";
import { useLocation } from "react-router-dom";
import "./ChartPage.css"; // Optional for additional styles

const ChartPage = () => {
    const location = useLocation();
    const { state } = location;
    const sheetUrl = state?.sheetUrl || "https://default-chart-url.com"; // Default fallback

    if (!sheetUrl) {
        return <p>Invalid sheet URL!</p>;
    }

    return (
        <div className="chart-page">
            <iframe
                src={sheetUrl}
                // style={{ width: "100%", height: "100vh", border: "none", overflow: "hidden", }}
                title="Chart Page"
                allow="fullscreen"
            ></iframe>
        </div>
    );
};

export default ChartPage;
