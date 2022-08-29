import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
    name: "results",
    initialState: {
        restaurantList: [],
        filteredRestaurantList: [],
        numOfResultsToShow: 10,
        mapView: false,
        isResultsVisible: false,
        selectedMarker: null,
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
        setIsResultsVisible: (state) => {state.isResultsVisible = true},

        setIsResultsNotVisible: (state) => {state.isResultsVisible = false},

        setSelectedMarker: (state, action) => {state.selectedMarker = action.payload}
        
    },
});

// Action creators are generated for each case reducer function
export const {
    setRestaurantList,
    setFilteredRestaurantList,
    setMap,
    setIsResultsVisible,
    setIsResultsNotVisible,
    setSelectedMarker
} = resultsSlice.actions;

export default resultsSlice.reducer;
