# 🥗 Bestaurants


## Description
A SPA to help you find the Top 10 Restaurants (The Bestaurants) of any kind in your city. This was my final project at Spiced Academy and a tool I personally wanted to use. 
It uses maps and scraped information from Google Maps and Places API to analyze and sort all available Restaurants in a big city. 
There is also automatic loaction finding and distance validation for the search results.

## Live website
https://top10restaurants.herokuapp.com/

## Features
- SPA created with React.js
- Mobile first philosophy, created to look like a phone App
- uses proprietary scraping logic (self-written) to request, collect, filter and sort data from Google Places API (please don't tell Google though)
- Guides users through available options and displays results dynamically according to the chosen variables
- Gives results in the form of restaurant lists and dynamically generated maps
- Uses React Redux store to calculate and keep variables, while switching through different views
- Uses location finder API to find the place name of the user's location
- Node.js & Express backend serves JSON with the available restaurant data 
- also calculates nearest matching city, if location doesn't match

## Technology Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) Toolkit
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![PostgreSQL](https://camo.githubusercontent.com/281c069a2703e948b536500b9fd808cb4fb2496b3b66741db4013a2c89e91986/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f737467726553514c2d3331363139323f7374796c653d666f722d7468652d6261646765266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge/)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Google Maps & Places API](https://img.shields.io/badge/GoogleMaps-CA4245?style=for-the-badge&logo=googlemaps&logoColor=white)

## Preview

![Preview](https://github.com/RobertMoravek/Bestaurants/blob/master/preview.jpg)