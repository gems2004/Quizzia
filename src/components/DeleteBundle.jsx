import React from "react";

function DeleteBundle({ handleDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    handleDelete();
  }
  return (
    <div
      className="modal fade"
      id="bundleDeleteModal"
      tabIndex="-1"
      aria-labelledby="deleteBundleModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title" id="deleteBundleModal">
              حذف الباقة
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>هل انت متأكد من حذف الباقة</p>
            <p className="lead">ملاحظة: لا يمكن التراجع عن هذه الخطوة</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
            >
              إغلاق
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              حذف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteBundle;
