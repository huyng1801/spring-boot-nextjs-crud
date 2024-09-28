// src/components/AddEditBookModal.js
import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddEditBookModal = ({ show, handleClose, bookData, onSave }) => {
    const [formData, setFormData] = React.useState({ title: '', author: '', isbn: '', price: '' });

    useEffect(() => {
        if (bookData) {
            setFormData(bookData);
        } else {
            setFormData({ title: '', author: '', isbn: '', price: '' });
        }
    }, [bookData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{bookData ? 'Edit Book' : 'Add Book'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formISBN">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ISBN"
                            value={formData.isbn}
                            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditBookModal;
