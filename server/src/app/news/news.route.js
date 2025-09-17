import express from "express";
const router = express.Router();

router.get('/checking', async(req, res) => {
  res.json("hello World!!!!!!!!!!!");
});

export default router;
