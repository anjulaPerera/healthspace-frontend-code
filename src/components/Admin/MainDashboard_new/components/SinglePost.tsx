import React, { useEffect, useState, useContext } from "react";
import Dp from "../../../vendors/images/photo4.jpg";
import LikeButton from "./Like";
import UserContext from "../../../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Posts } from "../../../../models/Posts";
import { AdminService } from "../../../../services/AdminService";
import { User } from "../../../../models/User";
import { environment } from "../../../../environment/environment";
import { FormFeedback, Form, Input } from "reactstrap";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { PublicService } from "../../../../services/PublicService";
import swal from "sweetalert";
import { PostsService } from "../../../../services/PostsService";
import CommentPosted from "./Comment";

interface SinglePostProps {
  post: Posts;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const [user] = useContext(UserContext);
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [isCommentSent, setIsCommentSent] = useState<boolean>(false);
  const [postOwner, setPostOwner] = useState<User>();
  const [timeElapsedAfterPosting, setTimeElapsedAfterPosting] =
    useState<string>("");
  const [postOwnerProfilePicture, setPostOwnerProfilePicture] =
    useState<string>("");
  const [commentsArray, setCommentsArray] = useState<any[]>([]);
  const handleCommentBtnClick = () => {
    setIsCommentBtnClicked(!isCommentBtnClicked);
    setIsCommentSent(false);
  };

  const handleCommentSendBtnClick = () => {
    setIsCommentSent(!isCommentSent);
  };

  useEffect(() => {
    AdminService.getUserById(post?.userId)
      .then((res) => {
        console.log(res.data, "is the post owner");
        setPostOwner(res.data);
        if (res.data?.profilePicture) {
          const baseUrl = environment.api_url;
          const absoluteUrl = `${baseUrl}/${res.data.profilePicture}`;
          console.log("Absolute URL:", absoluteUrl);
          setPostOwnerProfilePicture(absoluteUrl);
        }
      })
      .catch((err) => console.log(err));

    const postTimeElapsed = calculateTimeElapsed(post.createdAt);
    setTimeElapsedAfterPosting(postTimeElapsed);

    PostsService.getPostsByPostId(post._id)
      .then((res) => {
        console.log("res", res);
        console.log("comments array", res.data.commentsFrom);
        setCommentsArray(res.data.commentsFrom);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  function calculateTimeElapsed(dateString: string | number | Date) {
    const currentDate = new Date();
    const previousDate = new Date(dateString);

    const timeDifference = currentDate.getTime() - previousDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else {
      return "Just now";
    }
  }
  const handleCommentSending = async (data: any) => {
    console.log("inside handleCommentSending : data", data);
    if (data) {
      console.log("data is available: inside if", data);
      try {
        console.log("inside try");

        const res = await PostsService.putComment(post._id, user?._id, data);
        console.log("res:::::", res);

        if (res.success) {
          console.log("inside res.success");
        } else {
          swal({
            title: "Error",
            text: res.error,
            icon: "error",
          });
          console.log("error======", res.error);
        }
      } catch (error) {
        swal({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
        });
        console.log("error++++++", error);
      }
    }
  };
  const validationStep = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: "",
    },

    onSubmit: async (values: any, { resetForm }) => {
      console.log("inside validationStep onSubmit");
      console.log("values", values);
      const userData = {
        text: values.text,
      };

      console.log("userData before handleCommentSending:::::", userData);

      handleCommentSending(userData);

      resetForm();
    },
  });

  return (
    <div className="middle-content h-auto w-100 py-4 d-flex justify-content-center align-itmes-center px-2 repeating-section-for-posts">
      <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column ">
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div className="row w-100 d-flex">
            <div className="col-md-2 remove-right-padding">
              {" "}
              <img src={postOwnerProfilePicture} alt="" className="search-dp" />
            </div>
            <div className="col-md-10 remove-left-padding">
              <div className="row w-auto d-flex flex-column">
                <p className="name-post">{postOwner?.name}</p>
                <p className="job-post">{postOwner?.occupation}</p>
                <p className="time-post">{timeElapsedAfterPosting}</p>
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col-md-1"></div>
            <div className="col-md-11 ">
              <div className="separator-name-and-content"></div>
            </div>
          </div>
          <div className="row w-100 px-2 d-flex justify-content-left align-items-center">
            <p className="post-text">{post.content}</p>
          </div>
        </div>
        <div className="w-100 rounded-corners p-2 h-auto d-flex justify-content-center align-items-center p-3 feed-component-common flex-column mb-2">
          <div className="row w-100 d-flex justify-content-around align-items-center">
            <LikeButton
              likesFrom={post?.likesFrom || []}
              postId={post?._id || ""}
            />

            <div
              className="comment-post d-flex justify-content-around align-items-center cursor-pointer"
              onClick={
                !isCommentSent
                  ? handleCommentBtnClick
                  : () => {
                      handleCommentBtnClick();
                      handleCommentSendBtnClick();
                    }
              }
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="ml-1"
                style={{ color: "#4d4d4da6" }}
              />
              <p className="ml-1">Comment</p>
            </div>
          </div>
          <div
            className={`${
              isCommentBtnClicked ? "send-comment w-100 mt-3" : "hidden"
            }`}
          >
            <div className="w-100 d-flex justify-content-center align-itmes-center comment-write">
              <div className="row w-100">
                <div className="col-md-1 d-flex justify-content-center align-itmes-center px-0">
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="comment-dp"
                  />
                </div>
                <div className="col-md-9 d-flex justify-content-center align-items-center px-0 ml-2">
                  <Form
                    className="w-100 d-flex align-items-center"
                    onSubmit={(e) => {
                      console.log("e", e);
                      e.preventDefault();

                      validationStep.handleSubmit();

                      return false;
                    }}
                    // encType="multipart/form-data"
                  >
                    <Input
                      id="text"
                      name="text"
                      className="form-control rounded-input w-100"
                      placeholder="Enter your comment"
                      type="text"
                      value={validationStep.values.text}
                      onChange={validationStep.handleChange}
                      onBlur={validationStep.handleBlur}
                      invalid={
                        validationStep.touched.text &&
                        validationStep.errors.text
                          ? true
                          : false
                      }
                    />
                    {validationStep.touched.text &&
                    validationStep.errors.text ? (
                      <FormFeedback type="invalid">
                        {validationStep.errors.text}
                      </FormFeedback>
                    ) : null}
                    <button
                      className="btn comment-send-btn d-flex justify-content-center align-items-center"
                      type="submit"
                      onClick={handleCommentSendBtnClick}
                    >
                      Send
                      <span className="fas fa-chevron-right ml-1"></span>
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>

          <div
            className={` ${
              // isCommentSent
              1 == 1
                ? `w-100 h-auto d-flex flex-column justify-content-center align-items-center set-ovrflw-y ${
                    commentsArray.length !== 0 ? "padding-top-50" : ""
                  }`
                : "hidden"
            }`}
          >
            {commentsArray.map((comment, index) => (
              <CommentPosted comment={comment} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
