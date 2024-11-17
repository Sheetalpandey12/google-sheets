import React, { useState, useRef, useEffect } from "react";
import "./ResultPage.css";
import { useNavigate } from "react-router-dom";
import GoogleSheet from "./GoogleSheet";
// import axios from "axios";

const ResultPage = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate(); // Hook for navigation
    const [showSheet, setShowSheet] = useState(false);
    const [sheetUrl, setSheetUrl] = useState(""); // State to store the Google Sheet URL
    const sheetRef = useRef(null);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            const formattedTime = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });

            setDate(formattedDate);
            setTime(formattedTime);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleRefresh = () => {
        window.scrollTo(1, 1);
        window.location.reload();
    };

    
    const handleChartClick = (sheetUrl) => {
        // Navigate to ChartPage and pass the sheet URL
        navigate("/chart", { state: { sheetUrl } });
    };



    const handleShowSheet = (url) => {
        setSheetUrl(url); // Set the URL for the selected sheet
        setShowSheet((prev) => !prev);
        setTimeout(() => {
            sheetRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // Delay to ensure element is rendered before scrolling
    };

    return (
        <div className="container">
            <header className="header">
                <h1>
                    RAMRAJ <span style={{
                        backgroundColor: 'red',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '5px 10px',
                        animation: 'zoomInOut 1s infinite',
                        display: 'inline-block'
                    }}>LIVE</span> RESULT.IN
                </h1>
                <p className="date-time">
                    {date} <br /> {time}
                </p>
            </header>
            <div className="welcome-text">
                <h2 className="sliding-text">Welcome to Ramraj Live Result.in!!!</h2>
            </div>
            <section className="lucky-number">
                <section className="lucnumber">
                    <h2>TODAY'S LUCKY NUMBER</h2>
                </section>
                <div className="golden-ank">
                    GOLDEN ANK <span>1-6-4-9</span>
                </div>
            </section>
            <section className="second-purple">
                <section className="purple">
                    <h2>RAMRAJ LIVE RESULT</h2>
                    <p>SABSE TEZZ LIVE RESULT YAHI MILEGA!</p>
                </section>
                <div className="result-section">
                    <div className="result-card morning">
                        <h3>RAMRAJ MORNING</h3>
                        <div className="flex-container">
                            <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
                            <p>139-30-370</p>
                            <button className="chat-button" onClick={() =>  handleChartClick("https://docs.google.com/spreadsheets/d/1NOvrSJfO5mFLUVDBAlFwyw-xvMoVLtjA/preview")}>Chart</button>
                        </div>
                        <p>11:30 AM <span>1:30 PM</span></p>
                    </div>

                    <div className="result-card day">
                        <h3>RAMRAJ DAY</h3>
                        <div className="flex-container">
                            <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
                            <p>349-64-158</p>
                            <button className="chat-button" onClick={() =>  handleChartClick("https://docs.google.com/spreadsheets/d/1zn7sP5_OfD3fSdR76aAxV0ZroVzRpP0I/preview")}>Chart</button>
                        </div>
                        <p>4:00 PM <span>6:00 PM</span></p>
                    </div>

                    <div className="result-card night">
                        <h3>RAMRAJ NIGHT</h3>
                        <div className="flex-container">
                            <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
                            <p>570-20-127</p>
                            <button className="chat-button" onClick={() =>  handleChartClick("  https://docs.google.com/spreadsheets/d/1K5qyaWMwMAulgxPoEorAmPf5M2nzEiCT/preview")}  >Chart</button>
                        </div>
                        <p>8:30 PM <span>10:40 PM</span></p>
                    </div>
                </div>
            </section>
            <section className="last-purple">
                <section className="ll-purple">
                    <h2>MATKA LIVE RESULT</h2>
                </section>
                <p>KALYAN</p>
                <button onClick={() => window.open("https://dpbossss.services/panel-chart-record/kalyan.php", "_blank")} >Chart</button>
                <p>RAJDHANI NIGHT</p>
                <button onClick={() => window.open("https://dpbossss.services/panel-chart-record/rajdhani-night.php", "_blank")}>CHART</button>
                <p>MAIN BAZAR</p>
                <button onClick={() => window.open("https://dpbossss.services/panel-chart-record/main-bazar.php", "_blank")}>CHART</button>
            </section>
            <div className="back-disclaimer">
                <button>DOWNLOAD</button>
                <div className="last-disclaimer">
                    <h3>Disclaimer</h3>
                    <p>Visiting this site and browsing it is strictly recommended at your own risk. Every information available here is only for informational purposes.</p>
                </div>
            </div>
            <footer className="footer">
                <p>For more information or queries contact</p>
                <p>
                    <a
                        href="https://wa.me/919482800734
"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-link"
                        >

                            <i className="fab fa-whatsapp"></i>
                    </a>
                   
                    +91 9482800734
                    <a
                        href="https://t.me/9482800734"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="telegram-link"
                    >
                        <i className="fab fa-telegram-plane"></i>
                    </a>
                </p>
                {/* <p>+91 99900 99900</p> */}
                <p>&copy; 2024 ramrajliveresult. All Rights Reserved</p>
            </footer>
            {showSheet && (
                <div ref={sheetRef} className="sheet-container">
                    <iframe
                        src={sheetUrl}
                        // style={{ width: "100%", height: "100vh", border: "none" }}
                        title="Ramraj Sheet"
                        allow="zoom"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
