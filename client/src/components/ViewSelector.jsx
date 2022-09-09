import React from "react";
import { setTogglelist, setToggleMap } from "../redux/resultsSlice";
import { useDispatch, useSelector } from "react-redux";


export default function ViewSelector() {
    const {mapView} = useSelector(state => state.results);
    const dispatch = useDispatch();
    // console.log('VS');
    return (
        <div
            className="view-selector"
            onClick={() => {
                dispatch(setToggleMap());
                dispatch(setTogglelist());
            }}
        >
            {mapView && 
                <>
                    <img src="/list-icon.png" alt="" className="route-icon" />{" "}
                    <p>List</p>
                </>}
            {!mapView && (
                <>
                    <img src="/map-icon.png" alt="" className="route-icon" />{" "}
                    <p>Map</p>
                </>
            )}
        </div>
    );
}
