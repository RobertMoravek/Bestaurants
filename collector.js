const axios = require("axios");
const fs = require("fs");


const key = "AIzaSyC8n6mIsTUbA49yf6Ld4nOvGOdc0abCbow";
alreadyRunning = false;

async function collect (kitchen, radius, loc, countryName, locName) {
    // Make sure the function isn't already (or still) collecting something else
    if (!alreadyRunning) {
        alreadyRunning = true;
        const searchTerm = kitchen;


        let restaurantData = [];
        async function getRestaurants(token) {
            // If there is a "next page token"...
            if (token) {
                console.log("token");
                // ... use it to collect the next set of data
                var { data } = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&type=restaurant&location=${loc}&radius=${radius}&fields=place_id,name,type,rating,user_ratings_total&pagetoken=${token}&key=${key}`
                );
            } else {
                // ... otherwise just get the data
                console.log("no token", searchTerm);
                var { data } = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&type=restaurant&location=${loc}&radius=${radius}&fields=place_id,name,type,rating,user_ratings_total&key=${key}`
                );
            }
            // I forgot why promisses didn't work, but this makes sure that the data is there, when pushing it to the array
            await new Promise((resolve) => setTimeout(resolve, 1000));
            restaurantData.push(...data.results);

            // If there is more data (next page token), wait 1,5 seconds (google requirement) before you repeat the process
            if (data.next_page_token) {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log("about to start new request cycle");
                await getRestaurants(data.next_page_token);
            }
        }
        // Start the process of making requests to the API
        await getRestaurants();
        console.log("I waited");
        console.log(restaurantData);

        // Since google doesn't take the given radius seriously (if too few results), we need to check the actual straight line distance of the results
        let rangeCheckedRestaurantData = restaurantData.filter(item => {
            console.log('rangeChecking');
            function haversine_distance(mk1, loc, radius) {
                
                var R = 6371.071; // Radius of the Earth in km
                var rlat1 = mk1.geometry.location.lat * (Math.PI/180); // Convert degrees to radians
                var rlat2 = loc.split(",")[0] * (Math.PI/180); // Convert degrees to radians
                var difflat = rlat2-rlat1; // Radian difference (latitudes)
                var difflon = (loc.split(",")[1]-mk1.geometry.location.lng) * (Math.PI/180); // Radian difference (longitudes)
                
                var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
                // If the found distance is smaller than the given radius, keep the result
                return (d<radius/1000);
            }
            return haversine_distance(item, loc, radius)

        })
        console.log(rangeCheckedRestaurantData);

        // Presort the restaurant data first by stars, then by amount of reviews
        let sortedRestaurantData = rangeCheckedRestaurantData.sort((a, b) => {
            var n = b.rating - a.rating;
            if (n !== 0) {
                return n;
            }
            
            return b.user_ratings_total - a.user_ratings_total;
        });

        // If neccessary create a matching country folder
        if (!fs.existsSync(__dirname + "/restaurants/" + countryName)) {
            fs.mkdirSync(__dirname + "/restaurants/" + countryName);
        }
        // If neccessary create a matching city folder
        if (!fs.existsSync(__dirname + "/restaurants/" + countryName + "/" + locName)) {
            fs.mkdirSync(__dirname + "/restaurants/" + countryName + "/" + locName);
        }
        // Create the file with the results for this type of restaurant
        fs.writeFileSync(
            __dirname + "/restaurants/" + countryName + "/"+ locName + "/" + searchTerm + ".json",
            JSON.stringify(await sortedRestaurantData)
        );
        alreadyRunning = false;
    }
};

// Handwritten list of styles of food
listOfCuisines = [
    "Chinese",
    "German",
    "Greek",
    "Hamburgers",
    "Indian",
    "Italian",
    "Japanese",
    "Doener Kebap",
    "Mexican",
    "Pizza",
    "Spanish",
    "Sushi",
    "Thai",
    "Turkish",
    "Vietnamese",
    "Arabian",
    "French",
    "Fast Food",
    "Falaffel",
    "Asian Fusion",
    "Poke Bowl",
    "Ramen",
    "Korean",
    "Mongolian",
    "Currywurst",
    "Vegan",
    "Steak",
    "BBQ",
    "Burritos",
    "African",
    "Fusion",
    "Carribean",
    "Brazillian",
    "Pakistani",
    "Dumplings",
    "Indonesian",
    "Austrian",
    "Polish",
    "Russian",
    "Balkan",
    "Portugese",
    "Haute Cuisine",
    "Vegetarian",
    "Fine Dining",
    "Jewish Cuisine",
    "Halal",
    "British"
];

// Load the list of chosen european cities
let cityDB = JSON.parse(
            fs.readFileSync(__dirname + "/server/citiesReducedAndSortedEU.json").toString()
    );

// Main function, starting the collection process
async function runCollect () {
    for(let cityInfo of cityDB) {
        console.log(cityInfo);
        for (let item of listOfCuisines) {
            // Pass into the collect function the required parameters
            collect(item, 20000, `${cityInfo.lat},${cityInfo.lng}`, cityInfo.country, cityInfo.city)
            // Wait 10 seconds for all possible data colelction for one type of restaurant in one city to finish
            await new Promise((resolve) => setTimeout(resolve, 10000));
        }
    }
}

runCollect()


// Testing the details call to the API

// (async function () {
//     var { data } = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJG3e2FdRRqEcRx0GBFAr-ivE&key=${key}`
//     );

//     fs.writeFileSync(
//         __dirname + "/details.json",
//         JSON.stringify(await data)
//     );
//     console.log(data);
// })();



// Testing the photo call to the API

// (async function () {
//     var { data } = await axios.get(
//         `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AeJbb3fnH0vEKUhiA2tLN3NhYx58ZRYugk5lmPg1gVvat1hfeppSIfW63y664_n6klUNe_6gS-QNnJRDw5d3nySjtcveTF9YMFH66Bxxog8Ui5_s1JGnyDBjX6q3-MDnS2ecld6V8c8_hNTeFWqcVGMVy1wx1OQtcMhgfkXeJzIP9egxSUqB&key=AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM`
//     );

//     // fs.writeFileSync(
//     //     __dirname + "/details.json",
//     //     JSON.stringify(await data)
//     // );
//     console.log(data);
// })();


