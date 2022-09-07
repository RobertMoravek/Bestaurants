import React from "react";
import { useSelector} from "react-redux";
import Results from "./Results";
import Filters from "./filters";
import URLAnalyzer from "./urlAnalyzer";

export default function Search() {

    const { restaurantList } = useSelector(
        (state) => state.results
    );


    return (
        <>
            <URLAnalyzer/>
            <Filters/>

            {restaurantList.length > 0 && <Results />}
        </>
    );
}
