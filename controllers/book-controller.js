const { UserModel, BookModel } = require("../models/index");
const IssuedBook = require("../dtos/book-dto");

const getAllBooks = async (req, res) => {
      const books = await BookModel.find();
      if (books.length === 0) {
            return res.status(404).json({
                  success: false,
                  message: "Books not found!",
            });
      }
      return res.status(200).json({
            success: true,
            data: books,
      });
};

const getSingleBookById = async (req, res) => {
      const { id } = req.params;
      const book = await BookModel.findById(id);
      if (!book) {
            return res.status(404).json({
                  success: false,
                  message: "Book not found!",
            })
      }
      return res.status(200).json({
            success: true,
            data: book,
      });
};

const getAllIssuedBooks = async (req, res) => {
      const users = await UserModel.find({
            issuedBook: { $exists: true },
      }).populate("issuedBook");
      const issuedBooks = users.map((each) => new IssuedBook(each));
      if (issuedBooks.length === 0) {
            return res.status(404).json({
                  success: false,
                  message: "No user with issued books found!",
            });
      }
      return res.status(200).json({
            success: true,
            data: issuedBooks,
      });
}

const addNewBook = async (req, res) => {
      const { data } = req.body;
      if (!data) {
            return res.status(400).json({
                  success: false,
                  message: "No data to add!",
            });
      }
      await BookModel.create(data);
      const allBooks = await BookModel.find();
      return res.status(201).json({
            success: true,
            data: allBooks,
      });
}

const updateBookById = async (req, res) => {
      const { id } = req.params;
      const { data } = req.body;
      const updateBook = await BookModel.findOneAndUpdate({
            _id: id,
      }, data, {
            new: true,
      });
      return res.status(200).json({
            success: true,
            data: updateBook,
      });
}

module.exports = { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById };