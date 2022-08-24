import React from "react";

export default function Search () {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/test")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <>
            <p>{data}</p>
        </>
    );

}

