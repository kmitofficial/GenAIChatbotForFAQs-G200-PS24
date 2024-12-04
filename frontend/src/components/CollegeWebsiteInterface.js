import React, { useState } from 'react';
import './css/CollegeWebsiteInterface.css';
import Navigation from './Navigation';
import PageContent from './PageContent';
import Chatbot from './Chatbot';

const CollegeWebsiteInterface = () => {
    const [activePage, setActivePage] = useState('dashboard');

    return (
        <div className="app">
            <Navigation activePage={activePage} setActivePage={setActivePage} />
            <main className="container">
                <PageContent activePage={activePage} />
            </main>
            <Chatbot />
        </div>
    );
};

export default CollegeWebsiteInterface;