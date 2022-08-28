import React from "react";
import { setMap } from "../redux/resultsSlice";
import { useDispatch, useSelector } from "react-redux";


export default function ViewSelector() {
    const {mapView} = useSelector(state => state.results);
    const dispatch = useDispatch();
    console.log('VS');
    return (
        <div className="view-selector" onClick={() => { dispatch(setMap())}}>
            {mapView && <p>List</p> }
            {!mapView && <p>Map</p> }
        </div>
    );
}
