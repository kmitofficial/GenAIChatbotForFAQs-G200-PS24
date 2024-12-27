
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Carousel from 'react-bootstrap/Carousel';
import './css/PageContent.css';

const PageContent = ({ activePage }) => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (cardIndex) => {
    setActiveCard(cardIndex);
  };

  const chartData = [
    { name: 'Jan', Admissions: 120, Placements: 90 },
    { name: 'Feb', Admissions: 150, Placements: 110 },
    { name: 'Mar', Admissions: 180, Placements: 130 },
    { name: 'Apr', Admissions: 200, Placements: 150 },
    { name: 'May', Admissions: 190, Placements: 160 },
    { name: 'Jun', Admissions: 170, Placements: 140 },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h2>
              Welcome To Keshav Memorial Institute of Technology</h2>
              <p className="subheading">
              Keshav Memorial Institute of Technology (KMIT), established in year 2007, is one of the premier engineering colleges in the state of Telangana. KMIT is sponsored by Keshav Memorial Education Society (KMES), well known in Hyderabad, for the past 75 years, for running various educational institutions of repute. KMIT is approved by All India Council for Technical Education (AICTE), New Delhi, and affiliated to Jawaharlal Nehru Technological University (JNTU), Hyderabad and recognized by the Govt. of Telangana. KMIT is co-promoted and powered by Genesis Solutions Pvt. Ltd, a premier institute in Hyderabad imparting industry focused software training and education in emerging technologies and having tie-ups with leading MNCs. KMIT campus is located in Narayanaguda, a central locality in the city of Hyderabad.Welcome to the Dashboard! Explore the statistics of admissions and placements for various months.
              </p>
            </div>
            <div className="dashboard-chart">
              <h3 className="chart-title">Admissions vs Placements</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Admissions" stroke="#8884d8" strokeWidth={3} />
                  <Line type="monotone" dataKey="Placements" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="dashboard-cards">
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733455079/NAAC-01_aue3kx.jpg" alt="NAAC" />
                <h4>NAAC</h4>
                <p>National Assessment and Accreditation Council</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733562866/NBA-01_zwrdry.jpg" alt="NBA" />
                <h4>NBA</h4>
                <p>National Board of Accreditation</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733563280/NIRF-01_y2tcp8.jpg" alt="NIRF" />
                <h4>NIRF</h4>
                <p>National Institutional Ranking Framework</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733563441/IQAC-01_dp2f1p.jpg" alt="ARIIA" />
                <h4>IQAC</h4>
                <p>Internal Quality Assurance Cell</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733563641/Udaan-01_tdggmq.jpg" alt="UDAAN" />
                <h4>UDAAN</h4>
                <p>R&D Centre</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733563749/uttkarsh-01_slesot.jpg" alt="UTTKARSH" />
                <h4>UTTKARSH</h4>
                <p>R&D Centre</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733564005/CoE-01-01_w8j4sq.jpg" alt="CoE" />
                <h4>CoE</h4>
                <p>Centres of Excellence</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733563876/IIC-01_dhyktp.jpg" alt="IIC" />
                <h4>IIC</h4>
                <p>Industry Interaction Cell</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733565147/placements-01_ck5vnx.jpg" alt="UTTKARSH" />
                <h4>PLACEMENTS</h4>
                <p>The Training and Placement cell provides the official support base for placement of students.</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733565281/fs-01_ddehq9.jpg" alt="UTTKARSH" />
                <h4>FINISHING SCHOOL</h4>
                <p>KMIT instituted a comprehensive Finishing School program for its Final year students.</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733565633/swayam-01_ytndd4.jpg" alt="UTTKARSH" />
                <h4>SWAYAM</h4>
                <p>Number 1 across India two years in a row</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733565459/BEC-01_xl4yff.jpg" alt="UTTKARSH" />
                <h4>BEC</h4>
                <p>Business English Certificate</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733565380/project_dnrrjf.jpg" alt="UTTKARSH" />
                <h4>PROJECT SCHOOL</h4>
                <p>The project school aims to provide students with practical,real-world experience by working on industry-relevant projects</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733565701/imag_j8accj.png" alt="UTTKARSH" />
                <h4>IMAGINEERING SCHOOL</h4>
                <p>The KMTES Innovation Centre(KMIT,NGIT,KMEC), in collaboration with T-HUB Telangana.</p>
              </div>
              <div className="card">
                <img src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733565749/IFS_n9womi.png" alt="UTTKARSH" />
                <h4>INTERNATIONAL FS</h4>
                <p>International Finishing School is a training programme, conducted for International students.</p>
              </div>
            </div>
          </div>
        );
        case 'about':
            return (
              <div className="about-container">
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1732109250/cover_pbns3r.png"
                      alt="KMIT Overview"
                      height='500'
                      width='400'
                    />
                    <Carousel.Caption>
                      <p>Explore the vibrant KMIT campus, home to innovation and excellence.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src="https://res.cloudinary.com/dsfgf7eb7/image/upload/v1732524938/Keshav_Memorial_Institute_of_Technology-182_qzns1p.jpg"
                      alt="Second Slide"
                      height='500'
                      width='400'
                    />
                    <Carousel.Caption>
                      <p>Join us in our journey of learning and growth.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            );
          
            case 'academics':
  const departmentImages = {
    CSE: 'https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733836640/cse_o8ymwx.jpg?text=CSE',
    CSM: 'https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733836701/csm_onfcwv.jpg?text=CSM',
    IT: 'https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733836718/it_ak11ru.jpg?text=IT',
    CSD: 'https://res.cloudinary.com/dsfgf7eb7/image/upload/v1733836712/csd_ds8odf.jpg?text=CSD',
  };

  return (
    <div className="academics-container">
      <h2 className="section-title">Departments</h2>
      <div className="dashboard-cards">
        {['CSE', 'CSM', 'IT', 'CSD'].map((dept, index) => (
          <div
            key={index}
            className={`card ${activeCard === index ? 'active-card' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <img
              src={departmentImages[dept]} // Dynamically get the department's image
              alt={`${dept} Department`}
            />
            <h4>{dept}</h4>
            <p>Department of {dept}</p>
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
