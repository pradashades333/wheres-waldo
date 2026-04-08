require("dotenv").config();
const express = require("express");
const cors = require("cors");
const imagesRouter = require('./routes/images');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));
app.use(express.json());
app.use("/images", imagesRouter);
app.use("/scores", scoresRouter);

app.get("/", (req, res) => {
  res.json({ message: "Wheres waldo is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});