import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import UserContext from "../../../../context/UserContext";
import { Like } from "../../../../models/Posts";
import { PostsService } from "../../../../services/PostsService";
interface LikeButtonProps {
  likesFrom: Like[];
  postId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ likesFrom, postId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [user] = useContext(UserContext);
  // const [currentLikesCount, setCurrentLikesCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (user && likesFrom.some((like) => like.userId === user._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }

    PostsService.getPostsByPostId(postId)
      .then((res) => {
        setLikesCount(res.data.likesFrom.length);
        console.log("getting post by post id", res.data);
        console.log("getting post LIKES by post id", res.data.likesFrom.length);
      })
      .catch((err) => {
        console.log("getting post by post id ERROR", err);
      });
  }, [user]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);

    PostsService.putLike(postId, user?._id)
      .then((res) => {
        console.log(res);
        setIsLiked(!isLiked);
        isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="like-post d-flex justify-content-around align-items-center cursor-pointer"
      onClick={handleLikeClick}
    >
      {isLiked ? <AiFillHeart style={{ color: "red" }} /> : <AiOutlineHeart />}
      <p className="ml-1">Like {likesCount !== 0 ? `(${likesCount})` : ""}</p>
    </div>
  );
};

export default LikeButton;
