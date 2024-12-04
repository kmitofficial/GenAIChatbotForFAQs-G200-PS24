import React, { useState } from 'react';
import './css/Navigation.css';

const Navigation = ({ activePage, setActivePage }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const pages = ['dashboard', 'about', 'academics'];
    const userPages = ['profile', 'settings', 'logout'];

    const handleMenuToggle = () => {
        setShowDropdown(prev => !prev);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
        setShowDropdown(false); // Close the dropdown when selecting a page
    };

    return (
        <header className="navbar">
            <h1 className="navbar-brand">Keshav Memorial Institute of Technology</h1>
            <nav className="navbar-menu">
                <div className="nav-links">
                    {pages.map((page) => (
                        <button
                            key={page}
                            className={`nav-link ${activePage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </button>
                    ))}
                </div>


            </nav>

            {/* Mobile Search Bar */}
            <div className="mobile-search">
                <input type="text" placeholder="Search..." />
            </div>
        </header>
    );
};

export default Navigation;