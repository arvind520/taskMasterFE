import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const TodoCard = ({ todo, handleUpdate, handleDelete, show }) => {
  const { title, body, idx } = todo;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title ? title : "Title " + (idx + 1)}</h5>
        {body.length ? (
          <p className="card-text">{body}</p>
        ) : (
          <h6 className="card-subtitle mb-2 text-muted">No Description</h6>
        )}
        <div className="mt-4">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              show();
              handleUpdate(idx, todo?._id)
            }}
          >
            <FaRegEdit />&nbsp;
            Update
          </button>
          <button
            className="btn btn-sm btn-danger ml-3"
            style={{ float: "right" }}
            onClick={() => handleDelete(idx, todo?._id)}
          >
            <MdDeleteForever /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
