const config = require("config");
const express = require("express"); 
const router = express.Router();
const {Picture}    = require('../upload');
const path = require('path');
const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({ accessKey: config.get("secret") });
unsplash.users.profile(config.get("user"))
    .catch(err => {
      // Your flawless error handling code
    });

//routes

router.post("/upload", (req, res) => {
  Picture(req, res,(error) => {
      // console.log(res);
      if (error === "LIMIT_UNEXPECTED_FILE") {
            return res.json("Too many files to upload.");
            }
      if (error) return res.json("Error when trying to upload files.");

      let OUTPUT = () => {
        let PICTURE = [];
        if (req.files["picture"] === undefined){
          PICTURE = req.files["picture"]
        }else {
          req.files["picture"].forEach((image)=>{
            PICTURE.push(image.filename);
          });
        }
        let pictures =  PICTURE;
        //further processing. Incase if we decide to store in db.
        res.json("Done.");
      };

      if(req.files == undefined){
          OUTPUT()
      }else(
        OUTPUT()
      );
    }); 
});


router.get('/search', (req, res) => {
  const page = req.body.page || 1
  const per_page = req.body.per_page || 10

  //make request to api
  unsplash.search.photos(req.body.search, page, per_page, {
      orientation: "portrait"
    })
    .then(response => response.json())
    .then(data => {
      // Your code
      res.status(200).json({
        message: 'success',
        data: data
      })
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
})

module.exports = router;
