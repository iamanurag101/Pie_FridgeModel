import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import UploadForm from './components/UploadForm'; // Import UploadForm
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import Nutritional from './components/Nutritional';
//import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const App = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    return (
        <Router>
            <div>
                <Navigation />
                <Header data={landingPageData.Header} />
                <Routes>
                    <Route path="/" element={<Features data={landingPageData.Features} />} />
                    <Route path="/features" element={<Features data={landingPageData.Features} />} />
                    <Route path="/uploadform" element={<UploadForm />} />
                    <Route path="/Nutritional" element={<Nutritional />} />
                </Routes>
                <About data={landingPageData.About} />
                <Services data={landingPageData.Services} />
                <Gallery data={landingPageData.Gallery} />
                <Team data={landingPageData.Team} />
                <Contact data={landingPageData.Contact} />
            </div>
        </Router>
    );
};

export default App;