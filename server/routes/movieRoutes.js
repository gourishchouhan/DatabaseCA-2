const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel")

router.post("/", async(req , res) => {
    try{
        const {title, director, genre, releaseYear, availableCopies } = req.body;
        if (!title || !director || !genre || !releaseYear || !availableCopies) {
            return res.status(400).json({message:"All field are required"});
        }
        const newMovie = new Movie({
            title, director, genre, releaseYear, availableCopies
        });
        await newMovie.save();
        res.status(200).json({message:"NewMovie created"})
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
});

router.get("/:id", async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404).json({message:"movie not found!"})
        }
        res.status(200).json(movie);
    } catch (error){
        res.status(500).json({message:"server error"})
    }
})

router.put("/:id", async (req, res) => {
    try{
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!movie){
            return res.status(404).json({message:"Movie not found"});
        }
        res.status(200).json({message:"Updated"})
    }catch (error){
        res.status(500).json({message:"Server error"})
    }
});


router.delete("/:id", async (req, res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie){
            return res.status(404).json({message:"Movie not found"});
        }
        res.status(200).json({message:"Movie Deleted"})
    }catch (error){
        res.status(500).json({message:"Server error"})
    }
});

module.exports = router;