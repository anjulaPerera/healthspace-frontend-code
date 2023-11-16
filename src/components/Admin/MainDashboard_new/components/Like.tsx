import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="like-post d-flex justify-content-around align-items-center cursor-pointer"
      onClick={handleLikeClick}
    >
      {isLiked ? <AiFillHeart style={{ color: "red" }} /> : <AiOutlineHeart />}
      <p className="ml-1">Like</p>
    </div>
  );
};

export default LikeButton;
