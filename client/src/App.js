import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    BrowserRouter,
    Route,
    Redirect,
    Routes,
    Link,
    useLocation,
} from "react-router-dom";
import Search from "./components/Search.jsx";
import Home from "./components/Map.jsx";

function App() {
    

    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="/map" element={<Home/>}/>
                    
                    <Route path="*" element={<Search/>}/>
                    
                </Routes>
            
            </BrowserRouter>

        </>
    );
}

export default App;


