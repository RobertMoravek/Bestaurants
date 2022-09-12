const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const availableData = JSON.parse(require('fs').readFileSync(__dirname + '/availableData.JSON', 'utf8'))

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(express.static(path.join(__dirname, "..", "client", "public")));

if (process.env.NODE_ENV == "production") {
    app.use((req, res, next) => {
        if (req.headers["x-forwarded-proto"].startsWith("https")) {
            return next();
        }
        res.redirect(`https://${req.hostname}${req.url}`);
    });
}

app.get("/api", async (req, res) => {
    res.json({ message: "API!" });
});

app.get("/getnearestcity/:lat/:lng", async (req, res) => {
    console.log("get nearest city");
    let cityDB = JSON.parse(
            fs.readFileSync(__dirname + "/citiesReducedAndSortedEU.json").toString()
    );
    let foundCountry = "";
    let foundCity = "";
    let foundCityDistance = 100000000;
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
        if (result < foundCityDistance) {
            foundCityDistance = result;
            foundCity = city.city;
            foundCountry = city.country;
        }
    });

    res.json({"foundCity": foundCity, "foundCountry": foundCountry});
});


app.get("/availabledata", async (req, res) => {
    console.log('available Data requested');
    res.json(availableData);
});

// app.get("/searchoptionscountries", async (req, res) => {
//     console.log('searchoptionscountry');
//     let countriesNames = fs.readdirSync(__dirname + "/../restaurants/");
//     res.json(countriesNames);
// });

// app.get("/searchoptionscities/:country", async (req, res) => {
//     console.log("searchoptionscity");
//     let citiesNames = fs.readdirSync(
//         __dirname + "/../restaurants/" + req.params.country
//     );
//     res.json(citiesNames);
// });

// app.get("/searchoptionsrestaurants/:country/:city", async (req, res) => {
//     console.log("sorestauranttypes");
//     let restaurantTypes = fs.readdirSync(
//         __dirname +
//             "/../restaurants/" +
//             req.params.country +
//             "/" +
//             req.params.city
//     );
//     restaurantTypes = restaurantTypes.map((item) => item.slice(0, -5));
//     res.json(restaurantTypes);
// });

app.get("/searchoptionsresults/:country/:city/:type", async (req, res) => {
    console.log("searchoptionresults");
    let results = fs
        .readFileSync(
            path.join(
                __dirname +
                    "/../restaurants/" +
                    req.params.country +
                    "/" +
                    req.params.city +
                    "/" +
                    req.params.type +
                    ".json"
            )
        )
        .toString();
    // console.log(results);
    res.json(results);
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
