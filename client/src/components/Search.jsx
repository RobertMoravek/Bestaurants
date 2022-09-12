import React from "react";
import { useSelector} from "react-redux";
import Results from "./Results";
import Filters from "./Filters";
import URLAnalyzer from "./urlAnalyzer";


export default function Search() {

    const { restaurantList } = useSelector((state) => state.results);
    const { isUrlAnalyzerActive } = useSelector((state) => state.filters);

    return (
        <>

            {/* URL Anylizer runs on mount and tries to destruture the URL to extract chosen Country, City and Type of Restaurant */}
            {isUrlAnalyzerActive && <URLAnalyzer />}

            {/* A set of filters for selecting Country, City and Type of Restaurant manually */}
            <Filters />

            {/* If there are search results in the store, display the Results Component */}
            {restaurantList.length > 0 && <Results />}
        </>
    );
}
