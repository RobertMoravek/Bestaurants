import React from "react";

import { setSelectedPriceLevel } from "../redux/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";


export default function PriceSelector() {
    let [isPriceSelectorVisible, setIsPriceSelectorVisible] = useState(false);
    const dispatch = useDispatch();
    const selectorElement = useRef();
    // console.log(selectorElement);

    // Show or hide the price bracket Selector
    function selectorToggler() {
        if (!isPriceSelectorVisible) {
            selectorElement.current.classList.add("selected");
        } else {
            selectorElement.current.classList.remove("selected");
        }
        setIsPriceSelectorVisible(!isPriceSelectorVisible);
    }

    let { selectedPriceLevel } = useSelector((state) => state.filters);

    // Dispatch the selected price bracket
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
                {/* If the price Selector is visible, show the text. If not,... */}
                <div className="flex row gap-075">
                    {isPriceSelectorVisible ? (
                        <p>Price Level</p>
                    ) : // If a minimum Value is selected, show that value. If not, show the icon.
                    selectedPriceLevel ? (
                        <img
                            src={`/coin${selectedPriceLevel}.png`}
                            alt=""
                            className="coin-img"
                        />
                    ) : (
                        <img
                            src="/price-icon.png"
                            alt=""
                            className="route-icon"
                        />
                    )}
                </div>

                {/* Loop through the options of price brackets (undefined for entries without price bracket) */}
                {[1, 2, 3, 4, "undefined"].map((item) => {
                    let coinUrl = `/coin${item}.png`;

                    return item === selectedPriceLevel ? (
                        // If a value is slected, highlight it. If not, don't.
                        <button className="coin-button selected-button" onClick={() => {priceLevelSetter(item);}} key={item}>
                            <img src={coinUrl} alt="" className="coin-img" />
                        </button>
                    ) : (
                        <button className="coin-button" onClick={() => { priceLevelSetter(item)}} key={item}>
                            <img src={coinUrl} alt="" className="coin-img" />
                        </button>
                    );
                })}
            </div>
        </>
    );
}
