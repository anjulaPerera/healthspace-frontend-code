import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import UserContext from "../../../context/UserContext";
import Chats from "./Chats";
import CommonProfile from "./CommonProfile";
import CreatePost from "../MainDashboard_new/components/CreatePost";
import { PostsService } from "../../../services/PostsService";
import { Posts } from "../../../models/Posts";
import SinglePost from "../MainDashboard_new/components/SinglePost";

const Profile: React.FC = () => {
  const [user] = useContext(UserContext);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);

  useState<boolean>(false);

  useEffect(() => {
    try {
      PostsService.getPostsByUserId(user?._id)
        .then((res) => {
          console.log("get all posts res", res);

          if (res.data) {
            console.log("posts", res.data);
            const allPosts: any = res.data;
            const sortedPosts = [...allPosts].sort((a: Posts, b: Posts) => {
              const dateA = new Date(a?.createdAt || 0).getTime();
              const dateB = new Date(b?.createdAt || 0).getTime();
              return dateB - dateA;
            });

            setPosts(sortedPosts);
          } else {
            console.error("Invalid data structure received from the server.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="full-screen">
        <div className="feed-container container px-14rem mt-5rem">
          <div className="row align-items-start">
            <CommonProfile>
              <CreatePost />
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                {posts.map((post, index) => (
                  <SinglePost key={index} post={post} />
                ))}
              </div>
            </CommonProfile>
            <div className="col-md-5 right-col-feed px-3 d-flex justify-content-center">
              <Chats />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
