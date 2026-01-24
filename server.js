import express from "express";
import sum from "./sum.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/home", async (req, res) => {
  res.json({ message: "I am Root!" });
});

app.get("/getsum/:a/:b", async (req, res) => {
  const { a, b } = req.params;
  res.json({
    ans: sum(parseInt(a), parseInt(b)),
  });
});
