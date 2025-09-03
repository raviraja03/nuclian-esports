const router = require("express").Router();

router.get('/checking', async(req, res) => {
  res.json("hello World!!!!!!!!!!!");
});

module.exports = router;
