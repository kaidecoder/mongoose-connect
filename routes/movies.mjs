import express from "express"
const router = express.Router();

import Movie from "../models/movie.mjs";

//GET all movies, limit 50
router.get("/", async (req, res) => {
  let movies = await Movie.find().limit(50)
  res.status(200).json("movies", { movies: movies });
});

export default router