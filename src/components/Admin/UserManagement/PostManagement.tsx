import React, { useEffect, useState } from "react";
import { PostsService } from "../../../services/PostsService";
import { Posts } from "../../../models/Posts";
import { AdminService } from "../../../services/AdminService";
import { User } from "./../../../models/User";

const PostManagement: React.FC = () => {
  const [postsList, setPostsList] = useState<Posts[]>([]);
  useEffect(() => {
    document.title = "Posts Management - Admin | CRM";
  }, []);

  useEffect(() => {
    try {
      PostsService.getAllPosts().then((response) => {
        console.log("Every Post", response);
        const postList: any = response.data;
        setPostsList(postList);
        postList.map((post: any) => {
          AdminService.getUserById(post.userId).then((response) => {
            const user: User = response.data;
            console.log("User", user);
            post.append({ user: user });
          });
        });
        console.log("Posts", postsList);
      });
    } catch (error) {
      console.log(error);
    }
  });

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
          <tr>
            <td>Admin</td>
            <td>John Doe</td>
            <td>(123) 456-7890</td>
            <td>john.doe@example.com</td>
            <td>
              <button className="btn btn-danger btn-sm">Delete Post</button>
            </td>
          </tr>
          {/* {
            postsList.map((post:any, index) => {
              
              return (
                <tr key={index}>
                  <td>{post.user?.name}</td>
                  <td>{post}</td>
                  <td>{post.content}</td>
                  <td>{post.createdAt}</td>
                  <td>
                    <button className="btn btn-danger btn-sm">Delete Post</button>
                  </td>
                </tr>
              );
            })
          } */}
        </tbody>
      </table>
    </div>
  );
};

export default PostManagement;
