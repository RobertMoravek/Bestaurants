const axios = require("axios");
const fs = require("fs");


const key = "AIzaSyC8n6mIsTUbA49yf6Ld4nOvGOdc0abCbow";
alreadyRunning = false;

async function collect (kitchen, radius, loc, countryName, locName) {
    if (!alreadyRunning) {
        alreadyRunning = true;
        const searchTerm = kitchen;


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
            restaurantData.push(...data.results);

            if (data.next_page_token) {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log("about to start new request cycle");
                await getRestaurants(data.next_page_token);
            }
        }

        await getRestaurants();
        console.log("I waited");
        console.log(restaurantData);
        let rangeCheckedRestaurantData = restaurantData.filter(item => {
            console.log('rangeChecking');
            function haversine_distance(mk1, loc, radius) {
                
                var R = 6371.071; // Radius of the Earth in km
                var rlat1 = mk1.geometry.location.lat * (Math.PI/180); // Convert degrees to radians
                var rlat2 = loc.split(",")[0] * (Math.PI/180); // Convert degrees to radians
                var difflat = rlat2-rlat1; // Radian difference (latitudes)
                var difflon = (loc.split(",")[1]-mk1.geometry.location.lng) * (Math.PI/180); // Radian difference (longitudes)
                
                var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
                return (d<radius/1000);
            }
            return haversine_distance(item, loc, radius)

        })
        console.log(rangeCheckedRestaurantData);

        let sortedRestaurantData = rangeCheckedRestaurantData.sort((a, b) => {
            var n = b.rating - a.rating;
            if (n !== 0) {
                return n;
            }
            
            return b.user_ratings_total - a.user_ratings_total;
        });

        if (!fs.existsSync(__dirname + "/restaurants/" + countryName)) {
            fs.mkdirSync(__dirname + "/restaurants/" + countryName);
        }

        if (!fs.existsSync(__dirname + "/restaurants/" + countryName + "/" + locName)) {
            fs.mkdirSync(__dirname + "/restaurants/" + countryName + "/" + locName);
        }

        fs.writeFileSync(
            __dirname + "/restaurants/" + countryName + "/"+ locName + "/" + searchTerm + ".json",
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

// let cityDB = [
//     // { radius: 17000, loc: "52.510365,13.408230", countryName: "Germany", locName: "Berlin" },
//     // { radius: 15000, loc: "53.556940,10.010219", countryName: "Germany", locName: "Hamburg" },
//     // { radius: 12000, loc: "50.940903,6.959405", countryName: "Germany", locName: "Cologne" },
//     // { radius: 10000, loc: "50.123188,8.678766", countryName: "Germany", locName: "Frankfurt" },
//     // { radius: 30000, loc: "48.855016,2.339092", countryName: "France", locName: "Paris" },
//     // { radius: 13000, loc: "45.750274,4.862484", countryName: "France", locName: "Lyon" },
//     { radius: 14000, loc: "43.600682,1.443826", countryName: "France", locName: "Toulouse" },
// ];


let cityDB = JSON.parse(
            fs.readFileSync(__dirname + "/server/citiesReducedAndSortedEU.json").toString()
    );

async function runCollect () {
    
    for(let cityInfo of cityDB) {
        console.log(cityInfo);
        for (let item of listOfCuisines) {
            collect(item, 20000, `${cityInfo.lat},${cityInfo.lng}`, cityInfo.country, cityInfo.city)
            await new Promise((resolve) => setTimeout(resolve, 10000));
        }


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


