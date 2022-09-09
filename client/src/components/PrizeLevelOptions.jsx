import React from "react";
import { setSelectedPriceLevel } from "../redux/filtersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function PrizeLevelOptions() {
    
    const dispatch = useDispatch();
    let {selectedPriceLevel} = useSelector((state) => state.filters)

    function priceLevelSetter(input) {
        selectedPriceLevel === input
            ? dispatch(setSelectedPriceLevel(null))
            : dispatch(setSelectedPriceLevel(input));
        // console.log(priceLevelSelected);
    }

    return (
                <div className="priceLevelBox">
                {[1, 2, 3, 4, "undefined"].map((item) => {
                    let coinUrl = `/coin${item}.png`
                    console.log("button", item);
                    return (
                        item === selectedPriceLevel ?
                            <button className="coin-button selected-button" onClick={() => {priceLevelSetter(item)}}><img src={coinUrl} alt="" className="coin-img" /></button> :
                            <button className="coin-button" onClick={() => {priceLevelSetter(item)}}><img src={coinUrl} alt="" className="coin-img" /></button> 
                    )
                    })}
                </div>
    )
}