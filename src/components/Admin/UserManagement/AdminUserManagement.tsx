import React, { useEffect, useState } from "react";
import { AdminService } from "../../../services/AdminService";
import { User } from "../../../models/User";
import swal from "sweetalert";

const AdminUserManagement: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    document.title = "User Management - Admin | CRM";
    try {
      AdminService.getEveryUserByAdmin().then((response) => {
        console.log("Every User", response);
        const userList = response.data;
        setUserList(userList);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDeleteUser = (userId: any) => async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await AdminService.deleteUser(userId);
          console.log("deleted user", response);
          if (response.success) {
            swal("User has been deleted!", {
              icon: "success",
            });
            const updatedUserList = userList.filter(
              (user) => user._id !== userId
            );
            setUserList(updatedUserList);
          } else {
            swal("Error", response.message, "error");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        swal("User is safe!", {
          icon: "info",
        });
      }
    });
  };

  return (
    <div className="container us-man mt-2">
      <h2 className="mb-4">User Management</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>User Type</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user?._id}>
              <td>{user?.userType}</td>
              <td>{user?.name}</td>
              <td>{user?.phone}</td>
              <td>{user?.email}</td>
              <td>{user?.city}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDeleteUser(user?._id)}
                >
                  Remove User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;
