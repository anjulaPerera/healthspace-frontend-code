import React, { useEffect, useState, useContext } from "react";
import "../../../vendors/styles/healthSpaceStyles.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../../../context/UserContext";
import { Form, FormFeedback, Input } from "reactstrap";
import { PostsService } from "../../../../services/PostsService";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreatePost: React.FC = () => {
  const [user] = useContext(UserContext);

  const handlePostSend = async (data: any) => {
    console.log("inside handlesignUp : data", data);
    if (data) {
      console.log("data is available: inside if", data);
      try {
        console.log("inside try");
        console.log("data.content", data.content);

        const formData = new FormData();

        formData.append("content", data.content);

        console.log("formData", formData);

        const res = await PostsService.sendPost(data, user?._id);
        console.log("res:::::", res);

        if (res.success) {
          console.log("inside res.success");
          swal({
            title: "Success",
            text: "Post created successfully",
            icon: "success",
          });
        } else {
          swal({
            title: "Error",
            text: res.error,
            icon: "error",
          });
          console.log("error======||||", res.error);
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
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Please Enter content"),
    }),
    onSubmit: async (values: any, { resetForm }) => {
      console.log("values::::::::::", values);

      console.log("inside validationStep onSubmit");
      console.log("values", values);
      const postData = {
        content: values.content,
      };

      console.log("postData before handleSignUp:::::", postData);

      try {
        await handlePostSend(postData);

        resetForm();
      } catch (error) {
        swal({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
        });
        console.log("error++++++", error);
      }
    },
  });

  return (
    <>
      <div className="w-100 h-auto rounded-corners bg-white feed-component-common mt-4">
        <div className="middle-content h-auto w-100 p-2 d-flex justify-content-center align-itmes-center">
          <div className="w-100 d-flex justify-content-center align-itmes-center post-write">
            <div className="row w-100 pr-4">
              <div className="col-md-2 d-flex justify-content-center align-itmes-center px-0">
                <img src={user?.profilePicture} alt="" className="search-dp" />
              </div>
              <Form
                className="col-md-10 d-flex justify-content-center align-items-center px-0 h-100"
                onSubmit={(e) => {
                  e.preventDefault();

                  validationStep.handleSubmit();

                  return false;
                }}
              >
                <div className="w-100 d-flex justify-content-center align-items-center px-0 h-100">
                  <Input
                    id="content"
                    name="content"
                    type="text"
                    className="rounded-input w-100 h-100"
                    placeholder="Start a post..."
                    value={validationStep.values.content}
                    onChange={validationStep.handleChange}
                    onBlur={validationStep.handleBlur}
                    invalid={
                      validationStep.touched.content &&
                      validationStep.errors.content
                        ? true
                        : false
                    }
                  />
                  {validationStep.touched.content &&
                  validationStep.errors.content ? (
                    <FormFeedback type="invalid" style={{ border: "none" }}>
                      {validationStep.errors.content}
                    </FormFeedback>
                  ) : null}
                  <button
                    className="d-flex justify-content-center align-items-center cursor-p py-1 px-2 post-btn"
                    type="submit"
                  >
                    Post
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
