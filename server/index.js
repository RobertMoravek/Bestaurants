const express = require("express");
const axios = require("axios");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/api", async (req, res) => {
    
    res.json({ message: "API!" });
    
});

app.get("/test", async (req, res) => {
    
    res.json({ message: "Home!" });
    
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
