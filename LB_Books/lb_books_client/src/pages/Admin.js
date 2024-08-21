import React, { useState } from 'react';
import Search from '../components/Search';
import BookList from '../components/BookList';


const Admin = () => {
    const [showList, setShowList] = useState(true);

    const handleSearch = (searchResults) => {
        setShowList(false);
    }

    const handleClearSearch = () => {
        setShowList(true);
    }
return (
    <div>
        <h1 className='text-center'>Admin Dashboard</h1>
        <Search onSearch={handleSearch} onClearSearch={handleClearSearch}/>
        {showList && <BookList/>}  
    </div>
)
}
export default Admin;