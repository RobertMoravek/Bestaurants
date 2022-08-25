const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/api", async (req, res) => {
    
    res.json({ message: "API!" });
    
});

app.get("/searchoptionscountries", async (req, res) => {
    // let temp = JSON.parse(fs.readFileSync(__dirname + "/../restaurants/germany/berlin/koreanisch.json").toString());
    let countriesNames = fs.readdirSync(__dirname + "/../restaurants/");
    // let countriesObject = {countries: countryNames};
    res.json(countriesNames);
    
});

app.get("/searchoptionscities/:country", async (req, res) => {
    // console.log(req.params.country);
    let citiesNames = fs.readdirSync(__dirname + "/../restaurants/" + req.params.country);
    // let countriesObject = {countries: countryNames};
    res.json(citiesNames);
    
});

app.get("/searchoptionsrestaurants/:country/:city", async (req, res) => {
    // console.log(req.params);
    let restaurantTypes = fs.readdirSync(__dirname + "/../restaurants/" + req.params.country + "/" + req.params.city);
    restaurantTypes = restaurantTypes.map(item => item.slice(0, -5))
    // console.log(restaurantTypes);
    res.json(restaurantTypes);
    
});

app.get("/searchoptionsresults/:country/:city/:type", async (req, res) => {
    console.log(req.params);
    let results = (fs.readFileSync(path.join(__dirname + "/../restaurants/" + req.params.country + "/" + req.params.city + "/" + req.params.type + ".json"))).toString();
    console.log(results);
    res.json(results);
    
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
