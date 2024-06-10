import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";

import UserContext from "../../../context/UserContext";

import SinglePost from "./components/SinglePost";
import { PostsService } from "../../../services/PostsService";
import { Posts } from "../../../models/Posts";
import CreatePost from "./components/CreatePost";
import CommonProfile from "../Personal/CommonProfile";

import CreateListing from "./components/CreateListing";
import { Listings } from "../../../models/Listings";

import ListingsComponent from "./components/Listings";

const Feed: React.FC = () => {
  const [user] = useContext(UserContext);

  const [posts, setPosts] = useState<Posts[]>([]);


  useEffect(() => {
    try {
      PostsService.getAllPosts()
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
        <div className="feed-container container px-10rem mt-5rem">
          <div className="row justify-content-center align-items-start">
            {/* <div className="w-auto left-col-feed px-3 d-flex justify-content-center">
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
                <div className="px-2 pt-2 align-items-center justify-content-center">
                  <p>Left Section!</p>
                </div>
              </div>
            </div> */}
            <CommonProfile>
              <CreatePost />
              {user?.userType === "DONOR" ? <CreateListing /> : null}

              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                {posts.map((post, index) => (
                  <SinglePost key={index} post={post} />
                ))}
              </div>
            </CommonProfile>
            {user?.userType === "RECEIVER" ? <ListingsComponent /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
