import React, { useEffect, useState } from "react";
import { EditNote, DeleteOutline } from "@mui/icons-material";
import { getApi } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Loader from "../auth/Loader";
const Promotions = () => {
  const navigate = useNavigate();
  
  const createUser = () => {
    navigate("/home/createUser");
  };
  const updateUser = () => {
    navigate("/home/updateUser");
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
              <th>Created By</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotion.map((list) => (
              <tr key={list.id}>
                <td>{list.id}</td>
                <td>{list.title}</td>
                <td>{list.link}</td>
                <td>{list.created_by}</td>

                <td className="d-flex gap-1">
                  <div>
                    <EditNote
                      className="notesIcon cursor-pointer "
                      onClick={() => updateUser()}
                    />
                  </div>
                  <div>
                    <DeleteOutline className="deleteIcon" />
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
