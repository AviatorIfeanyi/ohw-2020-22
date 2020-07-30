const config = require("config");
const express = require("express");
const router = express.Router();
const {
  Picture
} = require('../upload');
const path = require('path');
const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
  accessKey: config.get("secret")
});
unsplash.users.profile(config.get("user"))
  .catch(err => {
    // Your flawless error handling code
  });
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_key"),
  api_secret: config.get("api_secret")
});

//routes
let global_pic;
router.post("/upload", (req, res) => {
  Picture(req, res, (error) => {
    // console.log(res);
    if (error === "LIMIT_UNEXPECTED_FILE") {
      return res.json("Too many files to upload.");
    }
    if (error) return res.json("Error when trying to upload files.");

    let OUTPUT = () => {
      let PICTURE = [];
      if (req.files["picture"] === undefined) {
        PICTURE = req.files["picture"]
      } else {
        req.files["picture"].forEach((image) => {
          PICTURE.push(image.filename);
        });
      }
      let pictures = PICTURE;
      global_pic = path.join(__dirname, '../public/uploads/' + pictures[0]);
      res.sendFile(path.join(__dirname, '../public/uploads/' + pictures[0]));
    };

    if (req.files == undefined) {
      OUTPUT()
    } else(
      OUTPUT()
    );
  });
});


router.get('/search', (req, res) => {
  const page = parseInt(req.body.page) || 1
  const per_page = parseInt(req.body.per_page) || 5

  //make request to api
  let output = [];
  unsplash.search.photos(req.body.search, page, per_page, {
      orientation: "portrait"
    })
    .then(response => response.json())
    .then(data => {
      data.results.forEach((pics) => {
        output.push(pics.urls.regular);
      });
      res.status(200).json({
        output
      });
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
})

let qwerty = cloudinary.image("sample.jpg", {
  transformation: [{
      width: 500,
      crop: "scale"
    },
    {
      overlay: {
        font_family: "Arial",
        font_size: 80,
        text: "OHW"
      }
    }
  ]
});

module.exports = router;