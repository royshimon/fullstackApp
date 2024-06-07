import React, { useState } from 'react';

const AddBookForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    author_id: parseInt(authorId),
                    published_date: publishedDate,
                    price: parseFloat(price)
                })
            });
            if (response.ok) {
                onAdd();
                setTitle('');
                setAuthorId('');
                setPublishedDate('');
                setPrice('');
            } else {
                console.error('Error adding book:', await response.text());
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Author ID:</label>
                <input type="number" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />
            </div>
            <div>
                <label>Published Date:</label>
                <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBookForm;
