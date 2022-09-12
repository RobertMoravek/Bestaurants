import React from "react";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMinReviews} from "../redux/filtersSlice";


export default function ReviewNumSelector() {
    // const {isPriceSelectorVisible} = useSelector(state => state.filters);
    let [isPriceSelectorVisible, setIsPriceSelectorVisible] = useState(false)
    const dispatch = useDispatch();
    const selectorElement = useRef();
    // console.log(selectorElement);

    let { selectedMinReviews } = useSelector((state) => state.filters);
    
    function selectorToggler () {
        if (!isPriceSelectorVisible) {
            selectorElement.current.classList.add("selected");
        } else {
            selectorElement.current.classList.remove("selected");
        }
        setIsPriceSelectorVisible(!isPriceSelectorVisible)
    }


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
                <div className="flex row gap-075">
                    {isPriceSelectorVisible ?
                        <p>Number of Reviews</p> :
                        selectedMinReviews != 10 ?
                            <p>&#62; {selectedMinReviews}</p> :
                            <img src="/review-num-icon.png" alt="" className="route-icon"/>
                            


                    
                    }
                </div>
                {[50, 100, 250, 500].map((item) => {
                    return (
                        item === selectedMinReviews ?
                            <button className="coin-button selected-button" onClick={() => {minReviewsSetter(item)}} key={item}> <p>&#62; {item}</p> </button> :
                            <button className="coin-button" onClick={() => {minReviewsSetter(item)}} key={item}> <p>&#62; {item}</p> </button> 
                    )
                    })}
            </div> 
            
        
        </>
    );
}
