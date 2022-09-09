import React from "react";

import { setSelectedPriceLevel } from "../redux/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";


export default function PriceSelector() {
    // const {isPriceSelectorVisible} = useSelector(state => state.filters);
    let [isPriceSelectorVisible, setIsPriceSelectorVisible] = useState(false)
    const dispatch = useDispatch();
    const selectorElement = useRef();
    console.log(selectorElement);

    function selectorToggler () {
        if (!isPriceSelectorVisible) {
            selectorElement.current.classList.add("selected");
        } else {
            selectorElement.current.classList.remove("selected");
        }
        setIsPriceSelectorVisible(!isPriceSelectorVisible)
    }

        let { selectedPriceLevel } = useSelector((state) => state.filters);

    function priceLevelSetter(input) {
        selectedPriceLevel === input
            ? dispatch(setSelectedPriceLevel(null))
            : dispatch(setSelectedPriceLevel(input));
        // console.log(priceLevelSelected);
    }


    return (
        <>



            <div
                className="price-selector"
                onClick={() => {
                    selectorToggler();
                }}
                ref={selectorElement}
            >
                <div className="flex row gap-075">
                    <img src="/price-icon.png" alt="" className="route-icon" />
                    {selectedPriceLevel === null ? 
                        <p>Price</p>:
                        <img src={`/coin${selectedPriceLevel}.png`} alt="" className="coin-img" />
                    
                    }
                </div>
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
            
        
        </>
    );
}
