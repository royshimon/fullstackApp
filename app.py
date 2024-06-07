from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db_config = {
    'user': 'root',
    'password': 'Drbs2003=',
    'host': 'localhost',
    'database': 'mydb'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)
# Retrieves list of all books
@app.route('/api/books', methods=['GET'])
def get_books():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Books')
    books = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(books)

# Adds new book
@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.get_json()
    title = data.get('title')
    author_id = data.get('author_id')
    published_date = data.get('published_date')
    price = data.get('price')
    
    if not all([title, author_id, published_date, price]):
        return jsonify({'error': 'Missing data'}), 400
    
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO books (title, author_id, published_date, price) VALUES (%s, %s, %s, %s)',
                   (title, author_id, published_date, price))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Book added successfully'}), 201

#Delete book by its ID
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM books WHERE book_id = %s', (book_id,))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'Book deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)