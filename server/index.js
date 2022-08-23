const express = require("express");
const axios = require("axios");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

const key = "AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM";
let alreadyRunning = false;

app.get("/api", async (req, res) => {
    if (!alreadyRunning) {
        alreadyRunning = true
    const searchTerm = "koreanisch";
    const radius = 20000;
    
    let restaurantData = [];
    async function getRestaurants(token) {
        

            if (token) {
                console.log("token");
                var { data } = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&type=restaurant&locationbias=circle:${radius}@52.507358,13.391376&fields=place_id,name,type,rating,user_ratings_total&pagetoken=${token}&key=${key}`
                );
            } else {
                console.log("no token", searchTerm);
                var { data } = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&type=restaurant&locationbias=circle:${radius}@52.507358,13.391376&fields=place_id,name,type,rating,user_ratings_total&key=${key}`
                );
            }

            
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("name of 0", await data.next_page_token);
            restaurantData.push(...data.results);

            if (data.next_page_token) {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log("about to start new request cycle");
                await getRestaurants(data.next_page_token);
                
            }
            
    }
    
    await getRestaurants();
    console.log('I waited');

    // console.log(restaurantData);
    // res.json({ message: "File written" });
    
    fs.writeFileSync(
        __dirname + "/" + searchTerm + ".json",
        JSON.stringify(await restaurantData)
    );
    alreadyRunning = false;
    res.json({ message: "Hello from server!" });
    }
    
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
