import React from "react";
import BundleCard from "../components/BundleCard";
import { useGetAllBundlesQuery } from "../features/bundles/bundlesApiSlice";
import Spinner from "../components/Spinner";
import ErrorToken from "../components/ErrorToken";
import Forbidden from "../components/Forbidden";

function BundlesPage() {
  const {
    data: bundles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllBundlesQuery();

  function subscribe() {
    document.getElementById("alertPlaceholder").innerHTML = `
    <div class="alert alert-success lead d-flex justify-content-between" role="alert">
    <div>
    <p class="d-inline">
    للاشتراك الرجاء التواصل على الواتساب: 
    </p>
    <a href="tel:099999999" class="nav-link d-inline">099999999</a>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
  }

  if (isError && error.status === 403) return <Forbidden />;

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <div className="container-fluid container-lg my-4">
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {bundles?.map((bundle) => {
            return (
              <div className="col" key={bundle.id}>
                <BundleCard
                  title={bundle.name}
                  price={bundle.price.slice(0, -4)}
                  features={[
                    `${bundle.no_of_quizzes} نماذج اتمتة`,
                    `${bundle.no_of_students} طالب`,
                    `${bundle.no_of_questions} سؤال لكل نموذج`,
                  ]}
                  subscribe={subscribe}
                />
              </div>
            );
          })}
        </div>
        <div id="alertPlaceholder" role="alert" className="mb-4"></div>
        <div className="mb-5 row">
          <div className="col-4 d-none d-lg-block"></div>
          <div className="col col-md-8 col-lg-4">
            <div className="card border-secondary">
              <div className="card-header">الباقات</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">ما الفائدة من الباقات؟</h5>
                <p className="card-text">
                  توفر الباقات القدرة على استخدام الموقع عن طريق السماح بعدد
                  محدد من النماذج والأسئلة وعدد الطلاب كما هو موضح في الأعلى.
                  حيث يتم تحديد نوع الاشتراك بكمية المبلغ المدفوع شهرياً.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError && error.status === 401) return <ErrorToken />;
}

export default BundlesPage;
