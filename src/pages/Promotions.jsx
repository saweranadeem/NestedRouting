import React from "react";
import { EditNote, DeleteOutline } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import "./User.css";
const Promotions = () => {
  const navigate = useNavigate();

  const createUser = () => {
    navigate("/home/createUser");
  };
  const updateUser = () => {
    navigate("/home/updateUser");
  };
  return (
    <>
      {/* Delete Confirmation Dialog */}

      <div className="tableDiv container ">
        <button className="tableButton" onClick={createUser}>
          Add User
        </button>
        <table className="table tableContainter ">
          <thead className="tableHeader">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Nationality</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Sawaira</td>
              <td>itsawaia</td>
              <td>023456678</td>
              <td>Pakistani</td>
              <td>24</td>
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Promotions;
