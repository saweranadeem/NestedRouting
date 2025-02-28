import React, { useState } from "react";
import "./FormStyling.css"; // Importing the CSS file
import { createApi } from "../services/apiService";
import Loader from "../auth/Loader";
const CreateUser = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createApi("/admin/add-promotion", { title, link, image });

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setImage(e.target.files[0])}
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
