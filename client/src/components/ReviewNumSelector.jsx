import React from "react";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMinReviews} from "../redux/filtersSlice";


export default function ReviewNumSelector() {
    let [isMinReviewSelectorVisible, setIsMinReviewSelectorVisible] = useState(false)
    const dispatch = useDispatch();
    const selectorElement = useRef();
    // console.log(selectorElement);

    let { selectedMinReviews } = useSelector((state) => state.filters);
    
    // Show or hide the Minimum review Selector
    function selectorToggler () {
        if (!isMinReviewSelectorVisible) {
            selectorElement.current.classList.add("selected");
        } else {
            selectorElement.current.classList.remove("selected");
        }
        setIsMinReviewSelectorVisible(!isMinReviewSelectorVisible)
    }

    // Dispatch the selected minimum number of reviews (10 as baseline, if nothing is selected)
    function minReviewsSetter(input) {
        selectedMinReviews === input
            ? dispatch(setSelectedMinReviews(10))
            : dispatch(setSelectedMinReviews(input));
        // console.log(priceLevelSelected);
    }


    return (
        <>



            <div
                className="review-num-selector"
                onClick={() => {
                    selectorToggler();
                }}
                ref={selectorElement}
            >
                {/* If the min review selector is visible, show the text. If not,... */}
                <div className="flex row gap-075">
                    {isMinReviewSelectorVisible ?
                        <p>Number of Reviews</p> :
                        // If a minimum Value is selected, show that value. If not, show the icon.
                        selectedMinReviews != 10 ?
                            <p>&#62; {selectedMinReviews}</p> :
                            <img src="/review-num-icon.png" alt="" className="route-icon"/>
                    }
                </div>

                {/* Loop through the options of minimum review numbers */}
                {[50, 100, 250, 500].map((item) => {
                    return (
                        // If a minimum value is slected, highlight it. If not, don't.
                        item === selectedMinReviews ?
                            <button className="coin-button selected-button" onClick={() => {minReviewsSetter(item)}} key={item}> <p>&#62; {item}</p> </button> :
                            <button className="coin-button" onClick={() => {minReviewsSetter(item)}} key={item}> <p>&#62; {item}</p> </button> 
                    )
                    })}
            </div> 
            
        
        </>
    );
}
