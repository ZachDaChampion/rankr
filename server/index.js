const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
require("dotenv").config();

app.get("/", (req, res) => res.send("hello world"));

app.get("/tvsearch", (req, res) => {
  console.log("TV SEARCH", req.query.search);
  axios
    .get(`https://api.themoviedb.org/3/search/tv?query=${req.query.search}`, {
      headers: {
        Authorization: `Bearer ${process.env.THEMOVIEDB_TOKEN}`,
      },
    })
    .then((result) => {
      console.log("result", result.data.results);
      res.send(result.data.results);
    });
});

app.listen(port);
