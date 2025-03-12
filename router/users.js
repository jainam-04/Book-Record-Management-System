const express = require("express");
const router = express.Router();

const { users } = require("../data/users.json");

/**
 * Route: /
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
      res.status(200).json({
            "success": "true",
            "data": users,
      });
});

/**
 * Route: /:id
 * Method: GET
 * Description: Get one user with their id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", (req, res) => {
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
 * Route: /
 * Method: POST
 * Description: Creating the user
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
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
 * Route: /:id
 * Method: PUT
 * Description: Updating the user by their id
 * Access: Public
 * Parameters: Id
 */

router.put("/:id", (req, res) => {
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
 * Route: /:id
 * Method: DELETE
 * Description: Deleting the user by their id
 * Access: Public
 * Parameters: Id
 */

router.delete("/:id", (req, res) => {
      const { id } = req.params;
      const user = users.find((each) => each.id === id);
      if (!user) {
            return res.status(404).json({
                  success: false,
                  message: "User doesn't exists!",
            });
      }
      const index = users.indexOf(user);
      users.splice(index, 1);
      return res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: users,
      });
});

module.exports = router;