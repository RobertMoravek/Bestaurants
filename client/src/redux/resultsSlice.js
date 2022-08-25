import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
    name: "results",
    initialState: {
        restaurantList: [],
        filteredRestaurantList: [],
        numOfResultsToShow: 10
    },
    reducers: {
        setRestaurantList: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.restaurantList = action.payload;
        },
        setFilteredRestaurantList: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.filteredRestaurantList = action.payload;
        },
        
    },
});

// Action creators are generated for each case reducer function
export const {
    setRestaurantList,
    setFilteredRestaurantList
} = resultsSlice.actions;

export default resultsSlice.reducer;
