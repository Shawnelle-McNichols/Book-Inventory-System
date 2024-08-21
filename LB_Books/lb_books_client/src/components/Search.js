import React, { useState } from 'react';
import BookDetailsForm from './BookDetailsForm';
import { ReactComponent as SearchIcon } from '../assets/search-outline.svg';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    function truncateText(text){
        if (text.length > 100){
            return text.substring(0, 255);
        }
        return text;
    }

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/books/search?query=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const text = await response.text();
            //console.log(text);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = JSON.parse(text);
            setBooks(data);
            onSearch(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleSelectedBook = (book) => {
        setSelectedBook(book);
        setBooks([]);
    };

    
    return (
        <div className='container'>
            <div className='search-bar'>
                <input
                    className='input search-input'
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books..."
                    required />
                <SearchIcon className="search-icon" type="button" onClick={handleSearch} />
            </div>
            <ul>
                {books.map((book) => (
                    <div className="card search-card" key={book.id} >
                        <li>
                            <img src={book.thumbnail} alt={`${book.title} cover`} width={100} />
                            <div><b>Title:</b> {book.title}</div>
                            <div><b>Author(s):</b> {book.authors}</div>
                            <div><b>Publication Date:</b> {book.pubDate}</div>
                            <div><b>Genre(s):</b> {book.genres}</div>
                            <div><b>ISBN:</b> {book.isbn}</div>
                            <div><b>Description:</b> {truncateText(book.description)}...</div>
                            <button className="sec-btn" type="button" onClick={() => handleSelectedBook(book)}>Select</button>
                        </li>
                    </div>
                ))}
            </ul>
            {selectedBook && (
                <BookDetailsForm
                    selectedBook={selectedBook}
                    onAddBook={() => setSelectedBook(null)}
                />
            )}
        </div>
    )
}
export default Search;