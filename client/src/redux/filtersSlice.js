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
        isCountryFilterVisible: false,
        isCityFilterVisible: false,
        isRestaurantTypeFilterVisible: false,
        isFiltersVisible: true,
        foundCity: "",
        foundCountry: "",
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
        
        setIsCountryFilterVisible: (state) => {state.isCountryFilterVisible = true},
        setIsCountryFilterNotVisible: (state) => {state.isCountryFilterVisible = false},
        
        setIsCityFilterVisible: (state) => {state.isCityFilterVisible = true},
        setIsCityFilterNotVisible: (state) => {state.isCityFilterVisible = false},

        setIsRestaurantTypeFilterVisible: (state) => {state.isRestaurantTypeFilterVisible = true},
        setIsRestaurantTypeFilterNotVisible: (state) => {state.isRestaurantTypeFilterVisible = false},

        setIsFiltersVisible: (state) => {state.isFiltersVisible = true},

        setIsFiltersNotVisible: (state) => {state.isFiltersVisible = false},

        setToggleFiltersVisible: (state) => {state.isFiltersVisible = !state.isFiltersVisible},

        setFoundCity: (state, action) => {state.foundCity = action.payload},

        setFoundCountry: (state, action) => {state.foundCountry = action.payload},

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
    setIsCountryFilterNotVisible,
    setIsCityFilterVisible,
    setIsCityFilterNotVisible,
    setIsRestaurantTypeFilterVisible,
    setIsRestaurantTypeFilterNotVisible,
    setIsFiltersVisible,
    setIsFiltersNotVisible,
    setToggleFiltersVisible,
    setFoundCity,
    setFoundCountry
} = filtersSlice.actions;

export default filtersSlice.reducer;
