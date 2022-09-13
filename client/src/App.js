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
import { useState } from "react";
import ErrorHandler from "./components/ErrorHandler";



function App() {
    const dispatch = useDispatch();
    const  [isIntroBackdropVisible, setIsIntroBackdropVisible] = useState(true)

    useEffect(() => {
        let logo = document.getElementsByClassName("logo-corner");
        logo[0].classList.remove("transparent");

        let introBackdrop = document.getElementsByClassName("introBackdrop");
        
        setTimeout(() => {
            logo[0].classList.remove("splash");
            introBackdrop[0].classList.add("transparent");
            setTimeout(() => {
                setIsIntroBackdropVisible(false)
                dispatch(setIsCountryFilterVisible())
            }, 1000);
        }, 2000);
    }, [])
    
    return (
        <div className="app">
            {isIntroBackdropVisible &&
                <div className="introBackdrop"></div>
            }

            {/* Options Bar always lives at the top */}
            <OptionsBar/>

            {/* Listens for possible Errors */}
            <ErrorHandler/>

            <div className="content">
                <BrowserRouter>
                    <Routes>

                        {/* All routes load the Search Component */}
                        <Route path="/" element={<Search/>}/>                        
                        <Route path="*" element={<Search/>}/>
                        
                    </Routes>
                
                </BrowserRouter>

            </div>

        </div>
    );
}

export default App;


