const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");
const { auth } = require("../middleware/auth");

//=================================
//         Favorite API
//=================================


router.post("/favoriteNumber", auth, (req, res) => {
    // Find favorite informatin inside Favorite Collection by Movie id

    Favorite.find({"movieId": req.body.movieId})
        .exec(( err, favorite ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, favoriteNumber:favorite.length})
        })
});


router.post("/favorited", auth, (req, res) => {
    // Find favorite information inside Favorite Collection by Movie id, userFrom
    Favorite.find({"movieId": req.body.movieId, "userForm": req.body.userForm})
        .exect((err, favorite) => {
            if(err) return res.status(400).send(err)

            // Now can wwe know if I already favorite this movie or not
            let result = false;
            if(favorite.length !== 0){
                result = true
            }

            res.status(200).json({ success:true, favorited: result })
        })
  
});


router.post("/addToFavorite", auth, (req, res) => {

    // Save the information about the movie or user Id insiide favoriiite Collectiion
    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        
        res.status(200).json({ success: true})
    })
});


router.post("/removeFromFavorite", auth, (req, res) => {

    // Save the information about the movie or user Id insiide favoriiite Collectiion
   Favorite.findOneAndDelete({
       movieId: req.body.movieId,
       userFrom: req.body.userForm
   }).exec((err, doc) => {
       if(err) return res.status(400).json({ sucess:false, err })
       res.status(200).json({ success: true, doc })
   })
});




router.post("/getFavoritedMovie", auth, (req, res) => {

    Favorite.find({ "userFrom": req.body.userForm })
    .exec((err, favorites) => {
        if(err) return res.status(400).send(err);

        return res.status(200).json({
            success: true,
            favorites
        })
    }) 
});


module.exports = router;
