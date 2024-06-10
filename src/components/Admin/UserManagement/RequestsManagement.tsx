import React from "react";

const RequestsManagement: React.FC = () => {
  return (
    <div className="container mt-2 us-man">
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
          <tr>
            <td>Admin</td>
            <td>John Doe</td>
            <td>(123) 456-7890</td>
            <td>john.doe@example.com</td>
            <td>New York</td>
            <td>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequestsManagement;
