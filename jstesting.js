const fs = require ("fs");


// let i = 0;
// let a = [];
// (async function () {
//     async function test () {
//         a.push(i);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         i++;
//         console.log(i);
//         i < 5 ? await test() : "";
        
//     }
    
//     await test();
//     console.log(a);
    
    
// })();

// let array1 = ['a','b','c'];
// let array2 = ['c','c','d','e'];
// // let array3 = array1.concat(array2);
// array3 = [...new Set([...array1,...array2])]

// console.log(array3);


// console.log(koreanisch);



// listOfCuisines = [
//     "Chinese",
//     "German",
//     "Greek",
//     "Hamburgers",
//     "Indian",
//     "Italien",
//     "Japanese",
//     "Doener Kebap",
//     "Mexican",
//     "Pizza",
//     "Spanish",
//     "Sushi",
//     "Thai",
//     "Turkish",
//     "Vietnamese",
//     "Arabian",
//     "French",
//     "Fast Food",
//     "Falaffel",
//     "Asian Fusion",
//     "Poke Bowl",
//     "Ramen",
//     "Korean",
//     "Mongolian",
//     "Currywurst",
//     "Vegan",
//     "Steak",
//     "BBQ",
//     "Burritos",
// ];

// async function sortAndSafe () {
    
//     for (let item of listOfCuisines) {
    
//         let temp = JSON.parse(
//             fs.readFileSync(__dirname + "/restaurants/germany/muenchen/" + item + ".json").toString()
//         );
        
//         let sorted = temp.sort((a, b) => {
//             var n = b.rating - a.rating;
//             if (n !== 0) {
//                 return n;
//             }
            
//             return b.user_ratings_total - a.user_ratings_total;
//         });
        
//         console.log(sorted);
//         fs.writeFileSync(
//             __dirname + "/restaurants/germany/muenchen/" + item + ".json",
//             JSON.stringify(sorted)
//         );
//         console.log('written');
//     }
// }    

// sortAndSafe();

// restaurantList = [{a: "a"}, {b: "b"}]

// restaurantList.map((item) => {
//     restaurantList.indexOf(item) < 1 && console.log(item);
// });





// let restaurants = JSON.parse(
//             fs.readFileSync(__dirname + "/restaurants/Germany/Berlin/Korean.json").toString()
//         );

// let cityDB = [
//     { radius: 17000, loc: "52.510365,13.408230", countryName: "Germany", locName: "Berlin" },
//     { radius: 15000, loc: "53.556940,10.010219", countryName: "Germany", locName: "Hamburg" },
//     { radius: 12000, loc: "50.940903,6.959405", countryName: "Germany", locName: "Cologne" },
//     { radius: 10000, loc: "50.123188,8.678766", countryName: "Germany", locName: "Frankfurt" },
//     { radius: 30000, loc: "48.855016,2.339092", countryName: "France", locName: "Paris" },
//     { radius: 13000, loc: "45.750274,4.862484", countryName: "France", locName: "Lyon" },
//     { radius: 14000, loc: "43.600682,1.443826", countryName: "France", locName: "Toulouse" },
// ];


// function haversine_distance(mk1, mk2) {

//     var R = 6371.071; // Radius of the Earth in km
//     var rlat1 = mk1.geometry.location.lat * (Math.PI/180); // Convert degrees to radians
//     var rlat2 = mk2.loc.slice(0, 9) * (Math.PI/180); // Convert degrees to radians
//     var difflat = rlat2-rlat1; // Radian difference (latitudes)
//     var difflon = (mk2.loc.slice(10)-mk1.geometry.location.lng) * (Math.PI/180); // Radian difference (longitudes)

//     var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
//     return (d<cityDB[0].radius);
// }

// console.log(haversine_distance(restaurants[0], cityDB[0]));


let cityListEU = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "United Kingdom"]

let worldcities = JSON.parse(
            fs.readFileSync(__dirname + "/restaurants/worldcities.json").toString()
    );

console.log(worldcities.length);

let filteredCities = worldcities.filter(city => {return city.population > 500000})

let filteredEUCities = filteredCities.filter(city => {
    let result = false;
    
    cityListEU.forEach(element => {
        // console.log(city.country == element);
        if (city.country == element) {
            console.log("returning true");
            result = true;
        } 
    });
    console.log(result);
    return (result == true ? true : false); 
})

let sortedByCountry = filteredEUCities.sort((a, b) => {
            return a.country.localeCompare(b.country);
        });

fs.writeFileSync(
    __dirname + "/restaurants/citiesReducedAndSortedEU.json",
    JSON.stringify(sortedByCountry)
);