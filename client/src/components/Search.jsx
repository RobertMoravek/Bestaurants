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
            {isUrlAnalyzerActive && <URLAnalyzer />}

            <Filters />

            {restaurantList.length > 0 && <Results />}
        </>
    );
}
