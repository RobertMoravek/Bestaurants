import React from "react";
import { setTogglelist, setToggleMap } from "../redux/resultsSlice";
import { useDispatch, useSelector } from "react-redux";

// Switches between map view and list view
export default function ViewSelector() {
    const {mapView} = useSelector(state => state.results);
    const dispatch = useDispatch();
    // console.log('VS');
    return (
        <div
            className="view-selector"
            onClick={() => {
                // Toggle one view off and the other view on
                dispatch(setToggleMap());
                dispatch(setTogglelist());
            }}
        >
            {/* Display icons according to user's choice */}
            {mapView && 
                <>
                    <img src="/list-icon.png" alt="" className="route-icon" />{" "}
                    {/* <p>List</p> */}
                </>}
            {!mapView && (
                <>
                    <img src="/map-icon.png" alt="" className="route-icon" />{" "}
                    {/* <p>Map</p> */}
                </>
            )}
        </div>
    );
}
