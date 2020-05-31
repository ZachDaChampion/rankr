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

app.get("/tvdetails", async (req, res) => {
  const id = req.query.id;
  let episodes = [];
  console.log("TV DETAILS", id);

  const tvDetails = (
    await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.THEMOVIEDB_TOKEN}`,
      },
    })
  ).data;
  console.log("DETAILS", tvDetails);

  const seasons = tvDetails.number_of_seasons;
  console.log("SEASONS", seasons);
  if (!seasons) return res.send(null);

  const seasonPromises = [];
  for (let i = 1; i <= seasons; ++i) {
    console.log("REQUEST", `https://api.themoviedb.org/3/tv/${id}/season/${i}`);
    seasonPromises.push(
      axios
        .get(`https://api.themoviedb.org/3/tv/${id}/season/${i}`, {
          headers: {
            Authorization: `Bearer ${process.env.THEMOVIEDB_TOKEN}`,
          },
        })
        .then((result) => {
          episodes = episodes.concat(
            result.data.episodes.map((episode) => {
              return {
                season: i,
                number: episode.episode_number,
              };
            })
          );
        })
        .catch((err) => console.error(err))
    );
  }
  await Promise.all(seasonPromises);

  console.log("EPISODES", episodes);
  return res.send(episodes);
});

app.listen(port);
