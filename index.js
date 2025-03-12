const express = require("express");
const app = express();
const port = 8081;

const userRouter = require("./router/users.js");
const bookRouter = require("./router/books.js");

app.use(express.json());

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("/", (req, res) => {
      res.status(200).json({
            "message": "Server is up and running",
      });
});

app.get("*", (req, res) => {
      res.status(404).json({
            "message": "This route doesn't exists!",
      });
});

app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
});