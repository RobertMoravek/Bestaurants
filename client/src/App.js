import React from "react";
import "./App.css";
import {
    BrowserRouter,
    Route,
    Routes,
    
} from "react-router-dom";
import Search from "./components/Search.jsx";

import Results from "./components/Results.jsx";
import OptionsBar from "./components/OptionsBar";



function App() {


    
    return (
        <div className="app">
            <img src="/bestaurants-logo-big.png" alt="" className="logo-corner"/>
            <OptionsBar/>
            <div className="content">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Search/>}/>
                        <Route path="/results" element={<Results/>}/>
                        
                        <Route path="*" element={<Search/>}/>
                        
                    </Routes>
                
                </BrowserRouter>

            </div>

        </div>
    );
}

export default App;


