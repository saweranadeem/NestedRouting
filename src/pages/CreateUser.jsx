import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormStyling.css"; // Importing the CSS file

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Contact number must be 10-15 digits")
    .required("Contact number is required"),
  nationality: Yup.string().required("Nationality is required"),
  age: Yup.number()
    .min(18, "You must be at least 18 years old")
    .max(60, "Age must be below 60")
    .required("Age is required"),
});

const CreateUser = () => {
  return (
    <div className="form-wrapper container">
      <Formik
        initialValues={{
          name: "",
          email: "",
          contactNumber: "",
          nationality: "",
          age: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted with values:", values);
        }}
      >
        {() => (
          <Form className="form-container">
            <h2>User Form</h2>

            <div className="form-group">
              <label>Name:</label>
              <Field type="text" name="name" className="input-field" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <Field type="email" name="email" className="input-field" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Contact Number:</label>
              <Field type="text" name="contactNumber" className="input-field" />
              <ErrorMessage
                name="contactNumber"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Nationality:</label>
              <Field type="text" name="nationality" className="input-field" />
              <ErrorMessage
                name="nationality"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label>Age:</label>
              <Field type="number" name="age" className="input-field" />
              <ErrorMessage
                name="age"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
