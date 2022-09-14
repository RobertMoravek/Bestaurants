import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice.js"
import resultsReducer from "./resultsSlice.js"

export default configureStore({
    reducer: {
        filters: filtersReducer,
        results: resultsReducer
    },
});
