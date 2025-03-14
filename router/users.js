const express = require("express");
const router = express.Router();

const { users } = require("../data/users.json");
const { getAllUsers, getSingleUserById, deleteUserById, updateUserById, addNewUser, getSubscriptionDetailsById } = require("../controllers/user-controller");

/**
 * Route: /
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllUsers);

/**
 * Route: /:id
 * Method: GET
 * Description: Get one user with their id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", getSingleUserById);

/**
 * Route: /
 * Method: POST
 * Description: Creating the user
 * Access: Public
 * Parameters: None
 */

router.post("/", addNewUser);

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating the user by their id
 * Access: Public
 * Parameters: Id
 */

router.put("/:id", updateUserById);

/**
 * Route: /:id
 * Method: DELETE
 * Description: Deleting the user by their id
 * Access: Public
 * Parameters: Id
 */

router.delete("/:id", deleteUserById);

/**
 * Route: /subscription-details/:id
 * Method: GET
 * Description: Getting the subscription details of the user by their id
 * Access: Public
 * Parameters: Id
 */

router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;