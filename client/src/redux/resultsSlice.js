import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
    name: "results",
    initialState: {
        restaurantList: [],
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
        
    },
});

// Action creators are generated for each case reducer function
export const {
    setRestaurantList,
} = resultsSlice.actions;

export default resultsSlice.reducer;
