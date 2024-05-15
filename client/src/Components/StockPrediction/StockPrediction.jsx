import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import "./StockPrediction.css";

const StockPrediction = ({ cardData, setIsLoggedIn, setMessage, setSearch, search, setStatus  }) => {
    // Fetch post data including image URLs when the component mounts
    useEffect(()=>{
        setMessage('Welcome to the Subscribed version');
        setStatus(true);
    },[])

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3; // Number of cards to display per page
  // Function to filter cardData based on search term
  const filteredCards = cardData.filter(card => card.title.toLowerCase().includes(search.toLowerCase()));
  
  
    // Calculate the index range for cards to display on the current page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const displayedCards = filteredCards.slice(startIndex, endIndex);
  
    // Function to handle pagination
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const formatDate = (dateString) => {
      const dateOnly = dateString.split('T')[0]; // Extracting date part only
      const [year, month, day] = dateOnly.split('-');
      return `${day}-${month}-${year}`;
    };
  
    // Function to handle search term change
    const handleSearchChange = (event) => {
      const searchTerm = event.target.value;
      setSearch(searchTerm);
      setCurrentPage(1); // Reset currentPage to 1 when search term changes
    };
  
    useEffect(() => {
      setCurrentPage(1); // Reset currentPage to 1 when search term changes
    }, [search]);
  

  return (
    <>
      {displayedCards.map((card) => (
        <div className="cardcontainer" key={card._id}>
          <Link to={`/subscribers/${card._id}`} className="card-link">
            <div className="card">
              <img src={card.imageUrl} className="card__image" alt="brown couch" />
              <div className="card__content">
                <time style={{ textDecoration: 'none', fontSize: '15px', color: 'black', fontWeight: 'bold' }} dateTime={card.date} className="card__date">Date: {formatDate(card.date)}</time>
                <span style={{ textDecoration: 'none', fontSize: '30px', color: 'black', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: card.title }} />
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {[...Array(Math.ceil(filteredCards.length / cardsPerPage)).keys()].map((pageNumber) => (
          <a
            key={pageNumber + 1}
            href="#"
            className={pageNumber + 1 === currentPage ? "active" : ""}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </a>
        ))}
      </div>
    </>
  );
};

const StockPredictionRoute = ({setSearch, card, search, message, setMessage, setStatus, setIsLoggedIn }) => {
  
  // Call the route guard function to check credentials
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const isSubscriber = localStorage.getItem('isSubscriber');
  const navigate = useNavigate()
  useEffect(() => {
    if (!(isLoggedIn === 'true' && isSubscriber === 'true')) {
      const timeout = setTimeout(() => {
        setMessage('You are not a Subscriber');
        setStatus(false);
        navigate('/');
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, isSubscriber]);

  return (
    <>
      {(isLoggedIn === 'true' && isSubscriber === 'true') && (
        <StockPrediction  setStatus={setStatus} setIsLoggedIn={setIsLoggedIn} setMessage={setMessage} cardData={card} setSearch={setSearch} search={search} />
      )}
    </>
  );
      }

export default StockPredictionRoute;
