import React, { useState } from 'react';
import axios from 'axios';
const BookDetailsForm = ({ selectedBook }) => {
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBook) {
            alert('No book selected');
            return;
        }

        const MAX = 255;
        function truncateText(text) {
            if (text.length > MAX) {
                return text.substring(0, MAX);
            }
            return text;
        }

        const bookData = {
            "title": selectedBook.title,
            "authors": selectedBook.authors,
            "isbn": selectedBook.isbn,
            "genres": selectedBook.genres,
            "description": truncateText(selectedBook.description),
            "thumbnail": selectedBook.thumbnail,
            "pubDate": selectedBook.pubDate,
            "price": parseFloat(price),
            "quantity": parseInt(quantity)
        };

        try {
            console.log(bookData);
            const response = await axios.post(`http://localhost:8080/api/books/add`, bookData);
            console.log(response.data);
            if (response.status === 200) {
                alert('Book added successfully!');
                window.location.reload();
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error adding book:", error);
            alert('Failed to add book!');
        }
    };

    return (
        <div>
            <h2> Add Book Form</h2>
            <img src={selectedBook.thumbnail} alt={`${selectedBook.title} cover`} width={100} />
            <p><b>Title:</b> {selectedBook.title}</p>
            <p><b>Author(s):</b> {selectedBook.authors}</p>
            <p><b>Isbn:</b> {selectedBook.isbn}</p>
            <p><b>Genre(s):</b> {selectedBook.genres}</p>
            <p><b>Description:</b> {selectedBook.description}</p>
            <p><b>Publication Date:</b> {selectedBook.pubDate}</p>
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
            <div className='form-group'><button className="main-btn" type="submit" onClick={handleSubmit}>Add Book</button></div>

            
        </div>
    )

}
export default BookDetailsForm;