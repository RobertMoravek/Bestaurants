import React from "react";
import "./App.css";
import {
    BrowserRouter,
    Route,
    Routes,
    
} from "react-router-dom";
import Search from "./components/Search.jsx";

import Results from "./components/Results.jsx";



function App() {


    
    return (
        <div className="app">
            <BrowserRouter>

            
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="/results" element={<Results/>}/>
                    
                    <Route path="*" element={<Search/>}/>
                    
                </Routes>
            
            </BrowserRouter>

        </div>
    );
}

export default App;


