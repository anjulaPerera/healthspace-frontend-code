import React, { useEffect, useState } from "react";
import { PostsService } from "../../../services/PostsService";
import { Posts } from "../../../models/Posts";
import { AdminService } from "../../../services/AdminService";
import { User } from "./../../../models/User";
import swal from "sweetalert";

const PostManagement: React.FC = () => {
  const [postsList, setPostsList] = useState<Posts[]>([]);
  useEffect(() => {
    document.title = "Posts Management - Admin | CRM";
  }, []);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        const response = await PostsService.getAllPosts();
        console.log("Every Post", response);
        const postList: any = response.data;

        // Fetch user data for each post and update the post list
        const postsWithUserData = await Promise.all(
          postList.map(async (post: any) => {
            try {
              const userResponse = await AdminService.getUserById(post?.userId);
              const user: User = userResponse.data;
              console.log("User", user);
              return { ...post, user }; // Combine post data with user data
            } catch (error) {
              console.error("Error fetching user data:", error);
              return post; // Return the original post if user data fetching fails
            }
          })
        );

        setPostsList(postsWithUserData);
        console.log("Posts with User Data", postsWithUserData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostsAndUsers();
  }, []);

  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Use Date.toLocaleString() method to format date and time
  };

  const handleDeletePost = (postId: any) => async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await PostsService.deletePostByAdmin(postId);
          if (response.success) {
            swal("Post has been deleted!", {
              icon: "success",
            });
            const updatedUserList = postsList.filter(
              (post) => post._id !== postId
            );
            setPostsList(updatedUserList);
          } else {
            swal("Error", response.message, "error");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        swal("Post is safe!", {
          icon: "info",
        });
      }
    });
  };

  return (
    <div className="container mt-2 us-man">
      <h2 className="mb-4">Posts Management</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Posted User</th>
            <th>User Type</th>
            <th>Content</th>
            <th>Posted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postsList.map((post: any, index) => {
            return (
              <tr key={index}>
                <td>{post.user?.name}</td>
                <td>{post.user?.phone}</td>
                <td>{post.content}</td>
                <td>{formatDateTime(post.createdAt)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDeletePost(post?._id)}
                  >
                    Delete Post
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PostManagement;
