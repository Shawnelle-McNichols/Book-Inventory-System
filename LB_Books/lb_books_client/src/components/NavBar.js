import React from 'react';
import Logo from '../assets/logo.png';
import { BrowserRouter as Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar">
                <span className="navbar-brand mb-0 h1">
                    <Link to="/">
                        <img src={Logo} alt='logo' height={60} />
                    </Link>                
                    </span>
                <button className='main-btn'>Logout</button>
            </nav>
        </div>
    )
}
export default NavBar;