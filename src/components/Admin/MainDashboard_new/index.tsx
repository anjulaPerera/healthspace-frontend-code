import React, { useEffect, useState, useContext } from "react";
import "../../vendors/styles/healthSpaceStyles.css";
import RightArrow from "../../vendors/images/icon/right-arrow.png";
import Crick1 from "../../vendors/images/crick1.png";
import UserContext from "../../../context/UserContext";

import SinglePost from "./components/SinglePost";
import { PostsService } from "../../../services/PostsService";
import { Posts } from "../../../models/Posts";
import CreatePost from "./components/CreatePost";
import CommonProfile from "../Personal/CommonProfile";
import ListingModal from "./components/ListingModal";
import RequestModal from "./components/RequestModal";

const Feed: React.FC = () => {
  const [user] = useContext(UserContext);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const handleCommentBtnClick = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
  };

  const handleCommentSendBtnClick = () => {
    setIsCommentSent(!isCommentSent);
  };

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

  const handleListingSubmit = (data: any) => {
    console.log(data);
    setIsListingModalOpen(false);
  };

  const handleRequestSubmit = (data: any) => {
    console.log(data);
    setIsRequestModalOpen(false);
  };

  return (
    <>
      <div className="full-screen">
        <div className="feed-container container px-10rem mt-5rem">
          <div className="row justify-content-center">
            {/* <div className="w-auto left-col-feed px-3 d-flex justify-content-center">
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
                <div className="px-2 pt-2 align-items-center justify-content-center">
                  <p>Left Section!</p>
                </div>
              </div>
            </div> */}
            <CommonProfile>
              <CreatePost />
              <button onClick={() => setIsListingModalOpen(true)}>
                Create Listing
              </button>
              <button onClick={() => setIsRequestModalOpen(true)}>
                Create Request
              </button>

              <ListingModal
                isOpen={isListingModalOpen}
                onRequestClose={() => setIsListingModalOpen(false)}
                onSubmit={handleListingSubmit}
              />

              <RequestModal
                isOpen={isRequestModalOpen}
                onRequestClose={() => setIsRequestModalOpen(false)}
                onSubmit={handleRequestSubmit}
              />
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
                {posts.map((post, index) => (
                  <SinglePost key={index} post={post} />
                ))}
              </div>
            </CommonProfile>
            {/* <div className="w-auto right-col-feed px-3 d-flex justify-content-center">
              <div className="w-100 h-auto rounded-corners bg-white feed-component-common">
                <div className="px-2 pt-2 align-items-center justify-content-center">
                  right section
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
