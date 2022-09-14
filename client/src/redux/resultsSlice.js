import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
    name: "results",
    initialState: {
        restaurantList: [],
        filteredRestaurantList: [],
        numOfResultsToShow: 10,
        mapView: false,
        listView: true,
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
        setMap: (state) => {state.mapView = true},
        
        setNotMap: (state) => {state.mapView = false},
        
        setToggleMap: (state) => {state.mapView = !state.mapView},

        setlist: (state) => {state.listView = true},
        
        setNotList: (state) => {state.listView = false},
        
        setTogglelist: (state) => {state.listView = !state.listView},

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
    setNotMap,
    setToggleMap,
    setIsResultsVisible,
    setIsResultsNotVisible,
    setSelectedMarker,
    setlist,
    setNotList,
    setTogglelist,
} = resultsSlice.actions;

export default resultsSlice.reducer;
