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
//     "chinesisch",
//     "deutsch",
//     "griechisch",
//     "hamburger",
//     "indisch",
//     "italienisch",
//     "japanisch",
//     "doener",
//     "mexikaniscH",
//     "pizza",
//     "spanisch",
//     "sushi",
//     "thailaendisch",
//     "tuerkisch",
//     "vietnameisch",
//     "arabisch",
//     "franzoesisch",
//     "fast food",
//     "falaffel",
//     "asian fusion",
//     "poke bowl",
//     "ramen",
//     "koreanisch",
//     "mongolisch",
//     "currywurst",
//     "vegan",
//     "steak",
//     "bbq",
//     "burritos",
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

restaurantList = [{a: "a"}, {b: "b"}]

restaurantList.map((item) => {
    restaurantList.indexOf(item) < 1 && console.log(item);
});
