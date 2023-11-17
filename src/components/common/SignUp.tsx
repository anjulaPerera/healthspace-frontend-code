import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap"; // Assuming you are using Reactstrap for styling
import { PublicService } from "../../services/PublicService";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    city: "",
    phone: "",
    userType: "",
    occupation: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
    coverImage: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    console.log("File input changed:", e.target.name);
    const files = e.target.files;
    console.log("Selected files:", files);
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value as string | Blob);
    });

    console.log("Form data to send:", formDataToSend);

    try {
      const response = await PublicService.signUp(formDataToSend);

      if (response.success) {
        const data = response.data;
        console.log("User registered successfully:", data);
      } else {
        const errorData = response.error;
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <Input
        type="date"
        name="dob"
        placeholder="Enter your date of birth"
        value={formData.dob}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="city"
        placeholder="Enter your city"
        value={formData.city}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="userType"
        placeholder="Enter your user type"
        value={formData.userType}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="occupation"
        placeholder="Enter your occupation"
        value={formData.occupation}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />

      {/* File inputs for profilePicture and coverImage */}
      <Input
        type="file"
        name="profilePicture"
        onChange={handleFileChange}
        accept="image/*"
      />
      <Input
        type="file"
        name="coverImage"
        onChange={handleFileChange}
        accept="image/*"
      />

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;
