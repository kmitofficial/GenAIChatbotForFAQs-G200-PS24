import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './css/PageContent.css';

const PageContent = ({ activePage }) => {
    const [activeCard, setActiveCard] = useState(null);

    const handleCardClick = (cardIndex) => {
        setActiveCard(cardIndex);
    };

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return (
                    <div className="dashboard-container">
                        <div className="dashboard-text">
                            <h2>Dashboard</h2>
                            <p>
                                Keshav Memorial Institute of Technology (KMIT), established in the year 2007, is one of the premier engineering colleges in the state of Telangana. KMIT is sponsored by Keshav Memorial Education Society (KMES), well known in Hyderabad, for the past 75 years, for running various educational institutions of repute. KMIT is approved by All India Council for Technical Education (AICTE), New Delhi, and affiliated to Jawaharlal Nehru Technological University (JNTU), Hyderabad and recognized by the Govt. of Telangana. KMIT is co-promoted and powered by Genesis Solutions Pvt. Ltd, a premier institute in Hyderabad imparting industry-focused software training and education in emerging technologies and having tie-ups with leading MNCs.
                            </p>
                        </div>
                        <div className="dashboard-image">
                            <img
                                src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1732109385/9864ad64139023aff21e2f9cc2641bf4_iowgms.jpg"
                                alt="KMIT Campus"
                            />
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 carousel-image"
                                    src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1732109250/cover_pbns3r.png"
                                    alt="First Slide"
                                />
                                <Carousel.Caption></Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 carousel-image"
                                    src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1732524938/Keshav_Memorial_Institute_of_Technology-182_qzns1p.jpg"
                                    alt="Second Slide"
                                />
                                <Carousel.Caption></Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                );
            case 'academics':
                return (
                    <div className="academics-container">
                        <h2>Departments</h2>
                        <div className="card-container">
                            {[
                                { name: 'Computer Science and Engineering', short: 'CSE' },
                                { name: 'CSE (Artificial Intelligence and Machine Learning)', short: 'CSM' },
                                { name: 'Information Technology', short: 'IT' }
                            ].map((department, index) => (
                                <div
                                    key={index}
                                    className={`card ${activeCard === index ? 'active-card' : ''}`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <h3>{department.short}</h3>
                                    <p>{department.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <p>Select a page to view content.</p>;
        }
    };

    return (
        <div className="page-content-wrapper">
            <div className="page-content">{renderContent()}</div>
        </div>
    );
};

export default PageContent;