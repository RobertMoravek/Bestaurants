const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

// Reads the json containing the structure of the available data

let availableData;
try { 
    availableData = JSON.parse(require('fs').readFileSync(__dirname + '/availableData.JSON', 'utf8'))
} catch (err) {
    console.log("Fehler:", err);
    availableData = {}
}

const app = express();


// Force https in production
if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// Finds the nearest city from my list by comparing it to the coordinates coming from the frontend. 

app.get("/getnearestcity/:lat/:lng", async (req, res) => {
    console.log("get nearest city");
    // Get the object with all available cities. Don't use availableData, since it won't work, if you're near a border
    let cityDB
    try {
        cityDB = JSON.parse(
                fs.readFileSync(__dirname + "/citiesReducedAndSortedEU.json").toString()
        );
    } catch (err) {
        console.log(err);
        cityDB = {}
    }
    let foundCountry = "";
    let foundCity = "";
    let foundCityDistance = 100000000;
    // For each city in the list, calculate the straigth line distance to the coordinates 
    if (Object.keys(cityDB).length > 0) {
        cityDB.forEach(city => {
            function haversine_distance(mk1, lat, lng) {
                        
                        var R = 6371.071; // Radius of the Earth in km
                        var rlat1 = city.lat * (Math.PI/180); // Convert degrees to radians
                        var rlat2 = lat * (Math.PI/180); // Convert degrees to radians
                        var difflat = rlat2-rlat1; // Radian difference (latitudes)
                        var difflon = (lng-city.lng) * (Math.PI/180); // Radian difference (longitudes)
                        
                        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
                        return d;
                    }
            let result =  haversine_distance(city, req.params.lat, req.params.lng)
            // If the current city is closer than the previous ones, set it to be the found city
            if (result < foundCityDistance) {
                foundCityDistance = result;
                foundCity = city.city;
                foundCountry = city.country;
            }
        });
    }
    // Return the found country and city to the frontend
    res.json({"foundCity": foundCity, "foundCountry": foundCountry});
});

// Passes the structure of the available data to the frontend

app.get("/availabledata", async (req, res) => {
    console.log('available Data requested');
    res.json(availableData);
});

// Read the json file corresponding to the search variables and passes it to the frontend

app.get("/searchoptionsresults/:country/:city/:type", async (req, res) => {
    console.log("searchoptionresults");
    let results 
    try {
        results = fs
            .readFileSync(
                path.join(__dirname + `/../restaurants/${req.params.country}/${req.params.city}/${req.params.type}.json`)
            )
            .toString();
    } catch (err) {
        console.log(err);
        results = {}
    }
    // console.log(results);
    res.json(results);
});

// Only neccessary in production (at least on heroku), to catch the requests with a string of url at the end. 
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
