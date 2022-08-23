import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    BrowserRouter,
    Route,
    Redirect,
    Routes,
    Link,
    useLocation,
} from "react-router-dom";
import APITest from "./components/apiTest.jsx";

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>{!data ? "Loading..." : data}</p>
                </header>
            </div>

        </>
    );
}

export default App;


