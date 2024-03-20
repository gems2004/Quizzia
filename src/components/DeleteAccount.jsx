import React from "react";

function DeleteAccount({ handleDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    handleDelete();
  }
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteAccountModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title" id="deleteAccountModal">
              حذف الحساب
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>هل انت متأكد من حذف الحساب؟</p>
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

export default DeleteAccount;
