const express = require("express");
const app = express();
const port = 8081;
const { users } = require("./data/users.json");

app.use(express.json());

app.get("/", (req, res) => {
      res.status(200).json({
            "message": "Server is up and running",
      });
});

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
      res.status(200).json({
            "success": "true",
            "data": users,
      });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get one user with their id
 * Access: Public
 * Parameters: Id
 */

app.get("/users/:id", (req, res) => {
      const { id } = req.params;
      const user = users.find((each) => each.id === id);
      if (!user) {
            return res.status(404).json({
                  success: false,
                  message: "User doesn't exists!",
            });
      }
      return res.status(200).json({
            success: true,
            message: "User found!",
            data: user,
      })
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating the user
 * Access: Public
 * Parameters: None
 */

app.post("/users", (req, res) => {
      const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
      const user = users.find((each) => each.id === id);
      if (user) {
            return res.status(404).json({
                  success: false,
                  message: "User already exists!",
            });
      }
      users.push({
            id, name, surname, email, subscriptionType, subscriptionDate
      });
      return res.status(201).json({
            success: true,
            message: "User added successfully!",
            data: users,
      });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating the user by their id
 * Access: Public
 * Parameters: Id
 */

app.put("/users/:id", (req, res) => {
      const { id } = req.params;
      const { data } = req.body;
      const user = users.find((each) => each.id === id);
      if (!user) {
            return res.status(404).json({
                  success: false,
                  message: "User doesn't exists!",
            });
      }
      const updateUserData = users.map((each) => {
            if (each.id === id) {
                  return {
                        ...each,
                        ...data,
                  };
            }
            return each;
      });
      return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: updateUserData,
      });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting the user by their id
 * Access: Public
 * Parameters: Id
 */

app.delete("/users/:id", (req, res) => {
      const { id } = req.params;
      const user = users.find((each) => each.id === id);
      if (!user) {
            return res.status(404).json({
                  success: false,
                  message: "User doesn't exists!",
            });
      }
})

app.get("*", (req, res) => {
      res.status(404).json({
            "message": "This route doesn't exists!",
      });
});

app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
});