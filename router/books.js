const express = require("express");
const router = express.Router();

const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById } = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

/**
 * Route: /
 * Method: GET
 * Description: Get All Books
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllBooks);

/**
 * Route: /issued
 * Method: GET
 * Description: Get All Issued Books
 * Access: Public
 * Parameters: None
 */

router.get("/issued", getAllIssuedBooks);

/**
 * Route: /:id
 * Method: GET
 * Description: Get Book By Id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", getSingleBookById);

/**
 * Route: /
 * Method: POST
 * Description: Create the Book
 * Access: Public
 * Parameters: None
 */

router.post("/", addNewBook);

/**
 * Route: /:id
 * Method: PUT
 * Description: Update the Book
 * Access: Public
 * Parameters: Id
 */

router.put("/:id", updateBookById);

module.exports = router;