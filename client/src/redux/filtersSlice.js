import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        availableCountries: [],
        chosenCountry: "",
        availableCities: [],
        chosenCity: "",
        availableTypesOfRestaurants: [],
        chosenTypeOfRestaurant: ""
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
} = filtersSlice.actions;

export default filtersSlice.reducer;
