import React from "react";
import "./App.css";
import {
    BrowserRouter,
    Route,
    Routes,
    
} from "react-router-dom";
import Search from "./components/Search.jsx";
import Home from "./components/Map.jsx";
import Results from "./components/Results.jsx";



function App() {


    
    return (
        <>
            <BrowserRouter>

            
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="/map" element={<Home/>}/>
                    <Route path="/results" element={<Results/>}/>
                    
                    <Route path="*" element={<Search/>}/>
                    
                </Routes>
            
            </BrowserRouter>

        </>
    );
}

export default App;


