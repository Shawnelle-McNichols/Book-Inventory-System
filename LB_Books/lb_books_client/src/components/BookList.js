import React, { useState, useEffect } from 'react';
import { ReactComponent as EditIcon } from '../assets/create-outline.svg'
import { ReactComponent as DeleteIcon } from '../assets/trash-outline.svg'
import axios from 'axios';
import UpdateBookForm from './UpdateBookForm';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/books`);
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:8080/api/books/${bookId}`);
            alert('Book deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    }

    const handleEdit = (bookId) => {
        setSelectedBook(bookId);
        setIsEditing(true);
    };

    return (
        <div>
            {isEditing ? (
                <UpdateBookForm bookId={selectedBook} />
            ) : (
                <div>
                    <h2>Book List</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Title</th>
                                <th scope='col'>Authors</th>
                                <th scope='col'>ISBN</th>
                                <th scope='col'>Genres</th>
                                <th scope='col'>Publication Date</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <div>
                                            <img src={book.thumbnail} alt="cover" width={40} />
                                        </div>
                                        <div>
                                            {book.title}
                                        </div>
                                    </td>
                                    <td>{book.authors}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.genres}</td>
                                    <td>{book.pubDate}</td>
                                    <td>${book.price}</td>
                                    <td>{book.quantity}</td>
                                    <td>
                                        <EditIcon width={24} color={"green"} type="button" onClick={() => handleEdit(book.id)} />
                                        <DeleteIcon width={24} color={"red"} type="button" onClick={() => handleDelete(book.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
export default BookList;