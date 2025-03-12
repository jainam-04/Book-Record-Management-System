const express = require("express");
const router = express.Router();

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

/**
 * Route: /
 * Method: GET
 * Description: Get All Books
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
      res.status(200).json({
            success: true,
            data: books,
      });
});

/**
 * Route: /issued
 * Method: GET
 * Description: Get All Issued Books
 * Access: Public
 * Parameters: None
 */

router.get("/issued", (req, res) => {
      const userWithIssuedBook = users.filter((each) => {
            if (each.issuedBook) {
                  return each;
            }
      });
      const issuedBooks = [];
      userWithIssuedBook.forEach((each) => {
            const book = books.find((book) => (book.id === each.issuedBook));
            book.issuedBy = each.name;
            book.issuedDate = each.issuedDate;
            book.returnDate = each.returnDate;
            issuedBooks.push(book);
      });
      if (issuedBooks.length === 0) {
            return res.status(404).json({
                  success: false,
                  message: "No Books have been issued yet!",
            });
      }
      return res.status(200).json({
            success: true,
            data: issuedBooks,
      });
});

/**
 * Route: /:id
 * Method: GET
 * Description: Get Book By Id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", (req, res) => {
      const { id } = req.params;
      const book = books.find((each) => each.id === id);
      if (!book) {
            return res.status(404).json({
                  success: false,
                  message: "Book doesn't exists!",
            });
      }
      return res.status(200).json({
            success: true,
            message: "Book found!",
            data: book,
      });
});

/**
 * Route: /
 * Method: POST
 * Description: Create the Book
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
      const { id, name, author, genre, price, publisher } = req.body;
      const book = books.find((each) => each.id === id);
      if (book) {
            return res.status(404).json({
                  success: false,
                  message: "Book already exists!",
            });
      }
      books.push({
            id, name, author, genre, price, publisher
      });
      return res.status(201).json({
            success: true,
            message: "Book added successfully!",
            data: books,
      });
});

/**
 * Route: /:id
 * Method: PUT
 * Description: Update the Book
 * Access: Public
 * Parameters: Id
 */

router.put("/:id", (req, res) => {
      const { id } = req.params;
      const { data } = req.body;
      const book = books.find((each) => each.id === id);
      if (!book) {
            return res.status(404).json({
                  success: false,
                  message: "Book doesn't exists!",
            });
      }
      const updateBookData = books.map((each) => {
            if (each.id === id) {
                  return {
                        ...each,
                        ...data
                  };
            }
            return each;
      });
      return res.status(200).json({
            success: true,
            message: "Book Updated Successfully!",
            data: updateBookData,
      });
});

module.exports = router;