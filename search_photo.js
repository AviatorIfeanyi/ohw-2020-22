const router = require('express').Router()
const Unsplash = require('unsplash-js').default

const unsplash = new Unsplash({
  accessKey: "{APP_ACCESS_KEY}",
})

router.get('/', (req, res) => {
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
        message: 'success'
      })
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
})

module.exports = router