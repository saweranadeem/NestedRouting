import React, { useEffect, useState } from "react";
import { EditNote, DeleteOutline } from "@mui/icons-material";
import { deleteApi, getApi } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Loader from "../auth/Loader";
const Promotions = () => {
  const navigate = useNavigate();

  const createUser = () => {
    navigate("/home/createUser");
  };
  const updateUser = (user) => {
    console.log(user);
    navigate("/home/updateUser", { state: { user } }); // ✅ Pass the entire user object
  };

  const [loading, setLoading] = useState(false);
  const [promotion, setPromotion] = useState([]);

  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    setLoading(true);
    try {
      const data = await getApi("/admin/get-promotions");
      // alert(JSON.stringify(data.promotions));
      setPromotion(data.promotions);
      // alert(JSON.stringify(promotion));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error in  fetching api", error);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteApi(`/admin/delete-promotion/${id}`);
      alert("Promotion deleted successfully!");

      // ✅ Remove deleted item from state
      setPromotion((prev) => prev.filter((promo) => promo.id !== id));
    } catch (error) {
      console.error("Error deleting promotion:", error);
      // alert("Failed to delete promotion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Delete Confirmation Dialog */}
      {loading && <Loader />}
      <div className="tableDiv container ">
        <button className="tableButton" onClick={createUser}>
          Add User
        </button>
        <table className="table tableContainter ">
          <thead className="tableHeader">
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>link Number</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotion.map((list) => (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.title}</td>
                <td>{list.link}</td>
                <td>
                  <img src={list.image} width={200} />
                </td>
                <td className="d-flex gap-3">
                  <div>
                    <EditNote
                      className="notesIcon cursor-pointer "
                      onClick={() => updateUser(list)}
                    />
                  </div>
                  <div>
                    <DeleteOutline
                      className="deleteIcon"
                      onClick={() => handleDelete(list.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Promotions;
