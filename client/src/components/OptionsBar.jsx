import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    setMin50Box,
    setIsFiltersVisible,
    setIsCountryFilterVisible,
    setIsCityFilterVisible,
    setIsRestaurantTypeFilterVisible,
    setIsCityFilterNotVisible,
    setIsRestaurantTypeFilterNotVisible,
    setIsCountryFilterNotVisible,
    setSelectedPriceLevel,
} from "../redux/filtersSlice";
import {setNotMap, setNotList } from "../redux/resultsSlice";

export default function OptionsBar() {
    const dispatch = useDispatch();
    const {
        chosenCountry,
        chosenCity,
        chosenTypeOfRestaurant,
        selectedPriceLevel,
    } = useSelector((state) => state.filters);

    function priceLevelSetter(input) {
        selectedPriceLevel === input ? 
            dispatch(setSelectedPriceLevel(null)) :
            dispatch(setSelectedPriceLevel(input));
        // console.log(priceLevelSelected);
    }


    return (
        <div className="options-bar">
                        <a href="/"><img src="/bestaurants-logo-big.png" alt="" className="logo-corner splash transparent"/></a>
            <div className="chosen-options">
                {chosenCountry.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCityFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterNotVisible());
                            dispatch(setIsCountryFilterVisible());
                            // dispatch(setIsCityFilterVisible())

                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCountry}
                    </p>
                )}
                {chosenCity.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCountryFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterNotVisible());
                            dispatch(setIsCityFilterVisible());
                            // dispatch(setAvailableTypesOfRestaurants());
                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenCity}
                    </p>
                )}
                {chosenTypeOfRestaurant.length > 0 && (
                    <p
                        onClick={() => {
                            dispatch(setNotMap());
                            dispatch(setNotList());
                            dispatch(setIsFiltersVisible());
                            dispatch(setIsCityFilterNotVisible());
                            dispatch(setIsCountryFilterNotVisible());
                            dispatch(setIsRestaurantTypeFilterVisible());
                        }}
                        className="single-chosen-option"
                    >
                        ▼ {chosenTypeOfRestaurant}
                    </p>
                )}
            </div>
            {chosenTypeOfRestaurant.length > 0 && (
                <div className="clickable-options-box">
                    <div className="min50box">
                        <label htmlFor="min50reviews" id="min50reviews-label">50+ reviews</label>
                        <input
                            type="checkbox"
                            name="min50reviews"
                            id="min50reviews"
                            onChange={() => dispatch(setMin50Box())}
                        />
                    </div>
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
                        {/* <button className="coin-button" onClick={() => {priceLevelSetter(2)}} ><img src="/coin2a.png" alt="$$" className="coin-img" title="medium priced"/></button>
                        <button className="coin-button" onClick={() => {priceLevelSetter(3)}} ><img src="/coin3a.png" alt="$$$" className="coin-img" title="higher priced"/></button>
                        <button className="coin-button" onClick={() => {priceLevelSetter(4)}} ><img src="/coin4a.png" alt="$$$$" className="coin-img" title="higher priced"/></button> */}
                    </div>

                </div>
            )}
        </div>
    )
}