import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import UserContext from "../../../../context/UserContext";
import { Like, Posts } from "../../../../models/Posts";
import { PostsService } from "../../../../services/PostsService";
import { User } from "../../../../models/User";
import { AdminService } from "../../../../services/AdminService";
import { environment } from "../../../../environment/environment";
interface CommentPostedProps {
  comment: any;
}

const CommentPosted: React.FC<CommentPostedProps> = ({ comment }) => {
  const [user] = useContext(UserContext);
  const [commentedUser, setCommentedUser] = useState<User>();
  const [commentedUserProfilePicture, setCommentedUserProfilePicture] =
    useState<string>("");
  useEffect(() => {
    const commentedUserId = comment?.userId;

    try {
      AdminService.getUserById(commentedUserId).then((res) => {
        setCommentedUser(res.data);
        if (res.data?.profilePicture) {
          const baseUrl = environment.api_url;
          const absoluteUrl = `${baseUrl}/${res.data.profilePicture}`;
          console.log("Absolute URL:", absoluteUrl);
          setCommentedUserProfilePicture(absoluteUrl);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-100 h-auto d-flex flex-column justify-content-center align-items-center mt-3">
      <div className="row w-100">
        <div className="col-md-2 d-flex justify-content-center align-items-center w-100 h-auto remove-right-padding">
          <img
            src={commentedUserProfilePicture}
            alt=""
            className="dp-comment"
          />
        </div>
        <div className="col-md-8 px-1 d-flex justify-content-center align-items-center remove-left-padding">
          <div className="w-100 h-auto p-2 d-flex flex-column justify-content-center align-items-start comment-body-container">
            <div className="name">
              <p className="bold">{commentedUser?.name}</p>
            </div>
            <div className="comment-body">
              <p>{comment?.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPosted;
