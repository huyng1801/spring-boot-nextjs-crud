// services/bookService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books'; 

const getAllBooks = async () => {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data;
};

const getBookById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

const createBook = async (bookData) => {
    const response = await axios.post(API_URL, bookData);
    return response.data;
};

const updateBook = async (id, bookData) => {
    const response = await axios.put(`${API_URL}/${id}`, bookData);
    return response.data;
};

const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

export default {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
