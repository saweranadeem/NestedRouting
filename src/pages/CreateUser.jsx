import React, { useEffect, useState } from "react";
import "./FormStyling.css"; // Importing the CSS file
import { createApi } from "../services/apiService";
import { skeletonClasses } from "@mui/material";
import Loader from "../auth/Loader";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createApi("/admin/add-promotion");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in fetching api", error);
    }
  };

  return (
    <div className="form-wrapper container">
      {loading && <Loader />}
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Create Promotions</h2>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Link</label>
          <input
            type="text"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
