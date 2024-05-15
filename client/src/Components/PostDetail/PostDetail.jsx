import React from 'react';
import { useParams } from 'react-router-dom';

export const PostDetail = ({ cardData }) => {
  // Use useParams hook to get the postId parameter from the URL
  const { postId } = useParams();

  // Find the card with the matching postId in cardData
  const card = cardData.find(card => card._id === postId);

  // Check if the card exists before rendering
  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <>
      <div>
        {/* <h2 dangerouslySetInnerHTML={{ __html: card.title }}></h2> */}
        {/* <img src={card.imageUrl} alt="" />   */}
        <p dangerouslySetInnerHTML={{ __html: card.description }}></p>
        {/* Add other post details as needed */}
      </div>
    </>
  );
};
