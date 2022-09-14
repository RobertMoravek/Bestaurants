import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        availableData: {},
        availableCountries: [],
        chosenCountry: "",
        availableCities: [],
        chosenCity: "",
        availableTypesOfRestaurants: [],
        chosenTypeOfRestaurant: "",
        isCountryFilterVisible: false,
        isCityFilterVisible: false,
        isRestaurantTypeFilterVisible: false,
        isFiltersVisible: true,
        foundCity: "",
        foundCountry: "",
        lat: "",
        lng: "",
        isUrlAnalyzerActive: true,
        selectedPriceLevel: null,
        selectedMinReviews: 10,
        errorMessage: false,
        errorResults: false,
    },
    reducers: {
        setAvailableData: (state, action) => {state.availableData = action.payload},

        setAvailableCountries: (state, action) => {
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

        setLat: (state, action) => {state.lat = action.payload},

        setLng: (state, action) => {state.lng = action.payload},

        setIsUrlAnalyzerActive: (state, action) => {state.isUrlAnalyzerActive = action.payload},

        setSelectedPriceLevel: (state, action) => {state.selectedPriceLevel = action.payload},

        setSelectedMinReviews: (state, action) => {state.selectedMinReviews = action.payload},

        setErrorMessage: (state, action) => {state.errorMessage = action.payload},

        setErrorResults: (state, action) => {state.errorResults = action.payload},


    },
});

// Action creators are generated for each case reducer function
export const {
    setAvailableData,
    setAvailableCountries,
    setAvailableCities,
    setAvailableTypesOfRestaurants,
    setChosenCountry,
    setChosenCity,
    setChosenTypeOfRestaurant,
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
    setFoundCountry,
    setLat,
    setLng,
    setIsUrlAnalyzerActive,
    setSelectedPriceLevel,
    setSelectedMinReviews,
    setErrorMessage,
    setErrorResults
} = filtersSlice.actions;

export default filtersSlice.reducer;
