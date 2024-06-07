import React, { useState, useEffect } from 'react';

const BookList = ({ onDelete }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            console.log('Fetching books...');
            const response = await fetch('http://127.0.0.1:5000/api/books');
            if (response.ok) {
                const data = await response.json();
                console.log('Books fetched successfully:', data);
                setBooks(data);
            } else {
                console.error('Failed to fetch books:', response.statusText);
                setError(`Failed to fetch books: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            setError(`Error fetching books: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.book_id}>
                        {book.title} - {book.author_id} - {book.published_date} - ${book.price}
                        <button onClick={() => onDelete(book.book_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
