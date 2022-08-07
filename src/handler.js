const {nanoid} = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = null;
        if (pageCount == readPage) {
            finished = true
        } else {
            finished = false
        }

    const newbooks = {
        id, 
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        finished,
        reading, 
        insertedAt, 
        updatedAt, 
    }

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        response.code(400);
        return response
    }
    if (readPage > pageCount) {
        const response =  h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response
    }

    books.push(newbooks);
    const success = books.filter((b) => b.id == id).length > 0;
    
        if (success) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        })
        response.code(201);
        return response;
        }
    
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    })
    response.code(500);
    return response
    
}

const getAllBooksHandler = (request, h) =>{
    const booksData = books.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher
    }));

    const response = h.response({
        status: 'success',
        data: {
            books: booksData
        }
    })
    response.code(200);
    return response
}

const getBooksByIdHandler = (request, h) =>{
    const {booksId} = request.params;
    const book = books.filter((b) => b.id === booksId)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book
            }
        })
        response.code(200);
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404);
    return response
}

const editBooksByIdHandler = (request, h) =>{
    const {booksId} = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload
    
    const updatedAt = new Date().toISOString();
    let finished = null;
    if (pageCount == readPage) {
        finished = true
    }else {
        finished = false
    }
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400);
        return response
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response
    }

    const index = books.findIndex((b) => b.id === booksId);
    
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
            finished
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        })
        response.code(200);
        return response
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404);
    return response
}

const deleteBooksByIdHandler = (request, h) =>{
    const {booksId} = request.params;
    const index = books.findIndex((b) => b.id === booksId);

    if (index !== -1) {
        books.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        })
        response.code(200);
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404);
    return response

}
module.exports = {
    addBooksHandler,
    getAllBooksHandler,
    getBooksByIdHandler,
    editBooksByIdHandler,
    deleteBooksByIdHandler
}