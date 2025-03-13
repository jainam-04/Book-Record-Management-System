const { UserModel, BookModel } = require("../models/index");

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
      
}

module.exports = { getAllBooks, getSingleBookById, getAllIssuedBooks };