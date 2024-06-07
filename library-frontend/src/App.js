import React, { useState } from 'react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

const App = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshBooks = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    const handleDelete = async (bookId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/books/${bookId}`, { method: 'DELETE' });
            if (response.ok) {
                console.log('Book deleted successfully');
                refreshBooks();
            } else {
                console.error('Failed to delete book:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleAdd = () => {
        refreshBooks(); // Refresh the list after adding a new book
    };

    return (
        <div>
            <BookList key={refreshKey} onDelete={handleDelete} />
            <AddBookForm onAdd={handleAdd} />
        </div>
    );
};

export default App;
