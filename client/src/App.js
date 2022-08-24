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

function App() {
    

    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="*" element={<Search/>}/>
                    
                </Routes>
            
            </BrowserRouter>

        </>
    );
}

export default App;


