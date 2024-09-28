"use client";

import React, { useEffect, useState } from 'react';
import bookService from '../services/bookService';
import { Table, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import AddEditBookModal from './AddEditBookModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchBooks = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (error) {
            setError('Failed to fetch books.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSave = async (bookData) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            if (currentBook) {
                await bookService.updateBook(currentBook.id, bookData);
                setSuccessMessage('Book updated successfully!');
            } else {
                await bookService.createBook(bookData);
                setSuccessMessage('Book added successfully!');
            }
            setCurrentBook(null);
            fetchBooks();
        } catch (error) {
            setError('Failed to save book.');
            console.error(error);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    const handleEdit = (book) => {
        setCurrentBook(book);
        setShowModal(true);
    };

    const handleDelete = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            await bookService.deleteBook(deleteId);
            setSuccessMessage('Book deleted successfully!');
            fetchBooks();
            setDeleteId(null);
            setShowConfirmDelete(false);
        } catch (error) {
            setError('Failed to delete book.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col>
                    <h1>Books</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Add Book
                    </Button>
                </Col>
            </Row>

            {loading && (
                <Spinner animation="border" role="status" className="mt-4">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
            {successMessage && <Alert variant="success" className="mt-4">{successMessage}</Alert>}

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>${book.price.toFixed(2)}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(book)} className="me-2">
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </Button>
                                <Button variant="danger" onClick={() => { setDeleteId(book.id); setShowConfirmDelete(true); }}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddEditBookModal
                show={showModal}
                handleClose={() => { setShowModal(false); setCurrentBook(null); }}
                bookData={currentBook}
                onSave={handleSave}
            />

            <ConfirmDeleteModal
                show={showConfirmDelete}
                onHide={() => setShowConfirmDelete(false)} // Ensure correct prop name
                onConfirm={handleDelete} // Ensure correct prop name
                bookTitle={books.find(book => book.id === deleteId)?.title} // Get the book title for confirmation
            />
        </Container>
    );
};

export default BooksPage;
