import React from "react";
import { useSelector } from "react-redux";
import { setErrorMessage } from "../redux/filtersSlice";
import { useDispatch } from "react-redux";

export default function ErrorHandler() {

    const {errorMessage} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    
    return (
        <>
            {errorMessage && 
                <div className="error-window">
                    <span className="restaurant-box-closer darkred" onClick={() => {dispatch(setErrorMessage(false))}}>+</span>
                    <h3>Error</h3>
                    <p>Unfortunately there seems to be an error.</p>
                    <p>Please reload the page, check the url or try again another time.</p>
                </div>
            }
        </>
    )
}