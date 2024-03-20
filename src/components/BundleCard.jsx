import React from "react";

function BundleCard({ title, price, features, subscribe }) {
  return (
    <div
      className={`card mb-4 rounded-3 shadow-sm ${
        title === "ذهبي" ? "border-primary" : ""
      }`}
    >
      <div
        className={`card-header py-3 ${
          title === "ذهبي" ? "bg-primary text-white" : ""
        }`}
      >
        <h4 className="my-0 fw-normal">{title}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          {price}ل.س<small className="text-muted fw-light">/شهر</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4 px-0">
          {features.map((feature, index) => {
            return <li key={index}>{feature}</li>;
          })}
        </ul>
        <button
          type="button"
          className={`w-100 btn btn-lg ${
            title !== "برونزي" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={subscribe}
          disabled={title === "مجاني" ? true : false}
        >
          اشتراك
        </button>
      </div>
    </div>
  );
}

export default BundleCard;
