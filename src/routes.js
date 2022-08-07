const {
    addBooksHandler,
    getAllBooksHandler, 
    getBooksByIdHandler,
    editBooksByIdHandler,
    deleteBooksByIdHandler
} = require('./handler');
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{booksId}',
        handler: getBooksByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{booksId}',
        handler: editBooksByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{booksId}',
        handler: deleteBooksByIdHandler
    }
];

module.exports = routes