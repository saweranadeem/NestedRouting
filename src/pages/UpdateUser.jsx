import React, { useState } from "react";
import "./FormStyling.css"; // Importing the CSS file
import { createApi } from "../services/apiService";
import Loader from "../auth/Loader";
import { useLocation } from "react-router-dom";

const CreateUser = () => {
  const location = useLocation();
  const { user } = location.state || {}; // ✅ Prevents crash if no user data

  // ✅ Initialize state with user data
  const [title, setTitle] = useState(user?.title || "");
  const [link, setLink] = useState(user?.link || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("link", link);
      if (image) {
        formData.append("image", image); // ✅ Only add if user selects new image
      }

      await createApi(`/admin/update-promotion/${user.id}`, formData);

      setLoading(false);
      alert("Promotion updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating promotion:", error);
    }
  };

  return (
    <div className="form-wrapper container">
      {loading && <Loader />}
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Update Promotions</h2>

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
          {user?.image && !image && (
            <div>
              <p>Current Image:</p>
              <img src={user.image} alt="Current" width={100} />
            </div>
          )}
          {image && (
            <div>
              <p>New Image Preview:</p>
              <img src={URL.createObjectURL(image)} alt="New" width={100} />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
