import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        availableCountries: [],
        chosenCountry: "",
        availableCities: [],
        chosenCity: "",
        availableTypesOfRestaurants: [],
        chosenTypeOfRestaurant: "",
        min50Box: false,
        isCountryFilterVisible: true,
        isCityFilterVisible: false,
        isRestaurantTypeFilterVisible: false,
        isFiltersVisible: true,
    },
    reducers: {
        setAvailableCountries: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.availableCountries = action.payload;
        },

        setAvailableCities: (state, action) => {
            state.availableCities = action.payload;
        },

        setAvailableTypesOfRestaurants: (state, action) => {
            state.availableTypesOfRestaurants = action.payload;
        },

        setChosenCountry: (state, action) => {
            state.chosenCountry = action.payload;
        },

        setChosenCity: (state, action) => {
            state.chosenCity = action.payload;
        },

        setChosenTypeOfRestaurant: (state, action) => {
            state.chosenTypeOfRestaurant= action.payload;
        },

        setMin50Box: (state) => {state.min50Box = !state.min50Box},
        
        setIsCountryFilterVisible: (state) => {
            console.log(state.isCountryFilterVisible);
            state.isCountryFilterVisible = !(state.isCountryFilterVisible);
            console.log(state.isCountryFilterVisible);
        },
        
        setIsCityFilterVisible: (state) => {state.isCityFilterVisible = !state.isCityFilterVisible},

        setIsRestaurantTypeFilterVisible: (state) => {state.isRestaurantTypeFilterVisible = !state.isRestaurantTypeFilterVisible},

        setIsFiltersVisible: (state) => {state.isFiltersVisible = true},

        setIsFiltersNotVisible: (state) => {state.isFiltersVisible = false},

        setToggleFiltersVisible: (state) => {state.isFiltersVisible = !state.isFiltersVisible},

    },
});

// Action creators are generated for each case reducer function
export const {
    setAvailableCountries,
    setAvailableCities,
    setAvailableTypesOfRestaurants,
    setChosenCountry,
    setChosenCity,
    setChosenTypeOfRestaurant,
    setMin50Box,
    setIsCountryFilterVisible,
    setIsCityFilterVisible,
    setIsRestaurantTypeFilterVisible,
    setIsFiltersVisible,
    setIsFiltersNotVisible,
    setToggleFiltersVisible
} = filtersSlice.actions;

export default filtersSlice.reducer;
