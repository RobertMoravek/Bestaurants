const fs = require("fs");

//Maps out the folders and files in the restaurant folder and saves it as availableData.JSON fro use by the server

function mapSizes(dir) {
    let content = fs.readdirSync(dir, { withFileTypes: true });
    let tempObj = {};
    for (let item of content) {
        if (item.isFile()) {
            let stats = fs.statSync(dir + "/" + item.name);
            tempObj[item.name] = stats.size;
        } else {
            tempObj[item.name] = mapSizes(dir + "/" + item.name);
        }
    }
    return tempObj;
}

const filesObj = mapSizes(__dirname + "/../restaurants/");

let filesJSON = JSON.stringify(filesObj, null, 4);

fs.writeFileSync(__dirname + "/availableData.JSON", filesJSON);
