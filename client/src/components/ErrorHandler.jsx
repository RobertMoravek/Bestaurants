import React from "react";
import { useSelector } from "react-redux";
import { setErrorMessage, setErrorResults } from "../redux/filtersSlice";
import { useDispatch } from "react-redux";

export default function ErrorHandler() {

    const {errorMessage, errorResults} = useSelector(state => state.filters)
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
            {errorResults && 
                <div className="error-window">
                    <span className="restaurant-box-closer darkred" onClick={() => {dispatch(setErrorResults(false))}}>+</span>
                    <h3>No results found</h3>
                    <p>Please adjust your search parameters.</p>
                </div>
            }
        </>
    )
}