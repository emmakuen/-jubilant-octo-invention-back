require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/comments", require("./routes/comments"));
app.use("/users", require("./routes/users"));
app.use("/comment-likes", require("./routes/comment-likes"));

// global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong...",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
