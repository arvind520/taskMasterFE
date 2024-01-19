import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const TodoCard = ({
  handleUpdate,
  handleDelete,
  todos,
  heading,
  type,
  handleStatusChange,
}) => {
  return (
    <div className="card" style={{ width: "19rem" }}>
      <div className={`card-header bg-${type} fw-bold text-white`}>
        {heading}
      </div>
      <ul className="list-group list-group-flush">
        {todos.length > 0 ? todos.map((todo, idx) => (
          <li key={idx} className="list-group-item">
            <blockquote className="blockquote">
              <p className="">
                {todo.title.length > 15
                  ? todo.title.slice(0, 15) + "..."
                  : todo.title}
              </p>
              {!todo.title && <p className="">Title {idx + 1}</p>}
              <footer
                className="blockquote-footer"
                style={{ fontSize: "small" }}
              >
                {todo.body ? todo.body : "No Description"}
              </footer>
            </blockquote>
            <div className="actionSection d-flex justify-content-between align-items-center gap-3">
              <div className="m-0 p-0">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  {(type == "info" || type == "success") && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleStatusChange(todo._id, "todo")}
                    >
                      Todo
                    </button>
                  )}
                  {(type == "warning" || type == "success") && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleStatusChange(todo._id, "inprogress")}
                    >
                      Inprogress
                    </button>
                  )}
                  {(type == "warning" || type == "info") && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleStatusChange(todo._id, "completed")}
                    >
                      Completed
                    </button>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary pb-2 me-1"
                  onClick={() => {
                    handleUpdate(todo._id);
                  }}
                >
                  <FaRegEdit />
                </button>
                <button
                  className="btn btn-sm btn-danger pb-2"
                  style={{ float: "right" }}
                  onClick={() => handleDelete(todo._id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </li>
        )): <li className="list-group-item">No Items</li>}
      </ul>
    </div>
  );
};

export default TodoCard;
