import React from "react";
import "./App.css";
import {
    BrowserRouter,
    Route,
    Routes,
    
} from "react-router-dom";
import { useDispatch } from "react-redux";
import Search from "./components/Search.jsx";
import { useEffect } from "react";
import Results from "./components/Results.jsx";
import OptionsBar from "./components/OptionsBar";
import { setIsCountryFilterVisible } from "./redux/filtersSlice";



function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        let logo = document.getElementsByClassName("logo-corner");
        logo[0].classList.remove("transparent");

        setTimeout(() => {
            logo[0].classList.remove("splash");
            setTimeout(() => {
                dispatch(setIsCountryFilterVisible())
            }, 1000);
        }, 2000);
    }, [])
    
    return (
        <div className="app">

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


