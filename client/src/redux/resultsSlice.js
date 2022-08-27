import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
    name: "results",
    initialState: {
        restaurantList: [],
        filteredRestaurantList: [],
        numOfResultsToShow: 10,
        mapView: false,
    },
    reducers: {
        setRestaurantList: (state, action) => {
            state.restaurantList = action.payload;
        },
        setFilteredRestaurantList: (state, action) => {
            state.filteredRestaurantList = action.payload;
        },
        setMap: (state) => {
            state.mapView = !state.mapView;
        },
        
    },
});

// Action creators are generated for each case reducer function
export const {
    setRestaurantList,
    setFilteredRestaurantList,
    setMap
} = resultsSlice.actions;

export default resultsSlice.reducer;
