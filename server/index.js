const express = require("express");
const cors = require("cors");
const axios = require("axios");
const url = require("url");
const path = require("path");
const serveStatic = require("serve-static");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(serveStatic(path.join(__dirname, "/../client/dist")));
async function getImgPath(size, path) {
  return (
    (
      await axios.get("https://api.themoviedb.org/3/configuration", {
        headers: {
          Authorization: `Bearer ${process.env.THEMOVIEDB_TOKEN}`,
        },
      })
    ).data.images.secure_base_url +
    (size || "original") +
    (path || "")
  );
}

// app.get("/", (req, res) => res.send("hello world"));

app.get("/imgpath", async (req, res) =>
  res.send(await getImgPath(req.query.size, req.query.path))
);

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

app.get("/placeholderstill", (req, res) => {
  console.log("file");
  return res.sendFile("no_still.jpg", {
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

  const response = await Promise.all(
    result.data.results.map(async (val) => {
      return {
        poster_path: val.poster_path
          ? await getImgPath("w342", val.poster_path)
          : url.format({
              protocol: req.protocol,
              host: req.get("host"),
              pathname: "/placeholderposter",
            }),
        name: val.name,
        year: val.first_air_date ? val.first_air_date.split("-")[0] : "Unknown",
        id: val.id,
      };
    })
  ).then((completed) => completed);

  console.log("result", response);
  return await res.send(response);
});

app.get("/tvtitle", async (req, res) => {
  const data = (
    await axios.get(`https://api.themoviedb.org/3/tv/${req.query.id}`, {
      headers: {
        Authorization: `Bearer ${process.env.THEMOVIEDB_TOKEN}`,
      },
    })
  ).data;

  res.send(
    `${data.name} (${
      data.first_air_date ? data.first_air_date.split("-")[0] : "Unknown"
    })`
  );
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

app.get("/episode", async (req, res) => {
  const showId = req.query.show;
  const seasonNum = req.query.s;
  const episodeNum = req.query.e;

  const rawData = (
    await axios.get(
      `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNum}/episode/${episodeNum}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.THEMOVIEDB_TOKEN}`,
        },
      }
    )
  ).data;

  const result = {
    season: rawData.season_number,
    episode: episodeNum,
    title: rawData.name,
    overview: rawData.overview,
    date: rawData.air_date,
    img: rawData.still_path
      ? await getImgPath(
          req.query.imgsize ? req.query.imgsize : "original",
          rawData.still_path
        )
      : url.format({
          protocol: req.protocol,
          host: req.get("host"),
          pathname: "/placeholderstill",
        }),
  };

  console.log("EPISODE", result);
  return res.send(result);
});

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});

app.listen(process.env.PORT || port);
