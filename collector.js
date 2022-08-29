const axios = require("axios");
const fs = require("fs");


const key = "AIzaSyAETR0aDAU9UH_TYuWXmXAv-Kazb7MpKhM";
alreadyRunning = false;

async function collect (kitchen) {
    if (!alreadyRunning) {
        alreadyRunning = true;
        const searchTerm = kitchen;
        const radius = 13000;
        const loc = "48.143023,11.560971";
        locName = "Munich"

        let restaurantData = [];
        async function getRestaurants(token) {
            if (token) {
                console.log("token");
                var { data } = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&type=restaurant&location=${loc}&radius=${radius}&fields=place_id,name,type,rating,user_ratings_total&pagetoken=${token}&key=${key}`
                );
            } else {
                console.log("no token", searchTerm);
                var { data } = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTerm}&type=restaurant&location=${loc}&radius=${radius}&fields=place_id,name,type,rating,user_ratings_total&key=${key}`
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
        console.log("I waited");

        let sortedRestaurantData = restaurantData.sort((a, b) => {
            var n = b.rating - a.rating;
            if (n !== 0) {
                return n;
            }
            
            return b.user_ratings_total - a.user_ratings_total;
        });

        fs.writeFileSync(
            __dirname + "/restaurants/Germany/"+ locName + "/" + searchTerm + ".json",
            JSON.stringify(await sortedRestaurantData)
        );
        alreadyRunning = false;
    }
};

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
];

async function runCollect () {
    for (let item of listOfCuisines) {

        collect(item)
        await new Promise((resolve) => setTimeout(resolve, 15000));
    }

}

runCollect()

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


