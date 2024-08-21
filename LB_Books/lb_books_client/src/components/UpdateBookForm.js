import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateBookForm = ({ bookId }) => {
    const [book, setBook] = useState(null);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                console.log(bookId);
                const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
                console.log(response);
                setBook(response.data);
                setPrice(response.data.price);
                setQuantity(response.data.quantity);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        if (bookId) {
            fetchBook();
        }
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!book) {
            alert('No book details available');
            return;
        }

        const MAX = 255;
        function truncateText(text) {
            if (text.length > MAX) {
                return text.substring(0, MAX);
            }
            return text;
        }

        const updatedBookData = {
            "title": book.title,
            "authors": book.authors,
            "isbn": book.isbn,
            "genres": book.genres,
            "description": truncateText(book.description),
            "thumbnail": book.thumbnail,
            "pubDate": book.pubDate,
            "price": parseFloat(price),
            "quantity": parseInt(quantity)
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/books/update/${book.id}`, updatedBookData);
            if (response.status === 200) {
                alert('Book updated successfully!');
                window.location.reload();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating book:", error);
            alert('Failed to update book!');
        }
    };
    if (!book){
        return <p>Loading book details...</p>;
    }

    return (
        <div>
            <h2> Update Book Form</h2>
            <img src={book.thumbnail} alt={`${book.title} cover`} width={100} />
            <p><b>Title:</b> {book.title}</p>
            <p><b>Author(s):</b> {book.authors}</p>
            <p><b>Isbn:</b> {book.isbn}</p>
            <p><b>Genre(s):</b> {book.genres}</p>
            <p><b>Description:</b> {book.description}</p>
            <p><b>Publication Date:</b> {book.pubDate}</p>
            <div className='form-group'>
                <label for="price">Price</label>
                <input
                    className='form-control input'
                    name="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required /></div>
            <div className='form-group'>
                <label for="quantity">Quantity</label>
                <input
                    className='form-control input'
                    name="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required />
            </div>
            <div className='form-group'><button className="main-btn" type="submit" onClick={handleSubmit}>Save Book</button></div>
        </div>
    )
}
export default UpdateBookForm;