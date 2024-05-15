import React, { useState, useEffect } from "react";
import "./HomeDetail.css";
import axios from 'axios'
import { Link } from "react-router-dom"

const HomeDetail = ({ cardData, setSearch, search }) => {
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

  // Function to handle search term change
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    setCurrentPage(1); // Reset currentPage to 1 when search term changes
  };

  useEffect(() => {
    setCurrentPage(1); // Reset currentPage to 1 when search term changes
  }, [search]);

  // Function to format date from YYYY-MM-DD to DD-MM-YYYY
  // Function to format date from YYYY-MM-DD to DD-MM-YYYY
// Function to format date from ISO 8601 to DD-MM-YYYY
const formatDate = (dateString) => {
  const dateOnly = dateString.split('T')[0]; // Extracting date part only
  const [year, month, day] = dateOnly.split('-');
  return `${day}-${month}-${year}`;
};

// Log the formatted date to check its value

  return (
    <>
      {/* Map through the displayed cards and render them */}
      {displayedCards.map((card) => (
        <div className="cardcontainer" key={card._id}>
          <Link style={{ textDecoration: 'none' }} to={`/posts/${card._id}`} className="card-link">
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

export default HomeDetail;
