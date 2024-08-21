import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Home = () => {
    const [books, setBooks] = useState([]);

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
    return (
        <div className="container">
            <h1 className='text-center'>Shop All Books</h1>
            <div className='row'>
                {books.map((book) => (
                    <div className='col-md-3 mb-4'>
                        <div className="card shop-card d-flex align-items-center" key={book.id}>
                            <div>
                                <img src={book.thumbnail} alt="cover" className='' />
                            </div>
                            <div>
                                <p className='card-title'><b>{book.title}</b></p>
                                <p>by <b>{book.authors}</b></p>
                                <p><b>${book.price}</b></p>
                                <button className='main-btn'>Add To Cart</button>
                            </div>
                            </div>
                        </div>
                ))}
                    </div>

        </div>
            )
}
            export default Home;