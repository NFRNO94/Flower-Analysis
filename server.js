const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//configure mongodb fascraper
const databaseUrl = "fascraper";
const collections = ["articles"];

const db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error: ", error);
});

/*app.get("/all", function (req, res) {
    db.articles.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});*/




axios.get("https://www.leafly.com/news/all").then(function (response) {

    let $ = cheerio.load(response.data);

    let results = [];

    $("a.leafly-article").each(function (i, element) {

        let title = $(element).children().text();
        let link = $(element).find();
        let imgLink = $(element).find();
        let summary = $(element).find();

        results.push({
            title: title,
            imgLink: imgLink,
            summary: summary,
            link: link
        });
    });
    console.log(results);
});

app.listen(PORT, function () {
    console.log("App now listening at http://localhost:" + PORT);
});