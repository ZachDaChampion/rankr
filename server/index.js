const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const url = require("url");
require("dotenv").config();

app.get("/", (req, res) => res.send("hello world"));

app.get("/placeholderposter", (req, res) => {
  console.log("file");
  return res.sendFile("no_poster.jpg", {
    root: __dirname,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  });
});

app.get("/tvsearch", async (req, res) => {
  console.log("TV SEARCH", req.query.search);
  const result = await axios.get(
    `https://api.themoviedb.org/3/search/tv?query=${req.query.search}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.THEMOVIEDB_TOKEN}`,
      },
    }
  );

  const response = result.data.results.map((val) => {
    return {
      poster_path: val.poster_path
        ? `http://image.tmdb.org/t/p/w342/${val.poster_path}`
        : url.format({
            protocol: req.protocol,
            host: req.get("host"),
            pathname: "/placeholderposter",
          }),
      name: val.name,
      year: val.first_air_date ? val.first_air_date.split("-")[0] : "Unknown",
      id: val.id,
    };
  });

  console.log("result", response);
  return await res.send(response);
});

app.listen(port);
