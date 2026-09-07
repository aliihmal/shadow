import { Link, useParams, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import categories from "../data/machines.json";

import "./MachineDetailPage.css";
import { useLanguage } from "../context/LanguageContext";

export default function MachineDetailPage() {
  const { categoryId, machineId } = useParams();
  const { t, pick } = useLanguage();

  const category = categories.find((c) => c.id === categoryId);
  const machine = category?.machines.find((m) => m.id === machineId);

  if (!category || !machine) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page">
      <Header />

      <section className="machine-detail">
        <div className="container">

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">{t("nav.products")}</Link>

            <span>/</span>

            <Link to={`/category/${category.id}`}>
              {pick(category.name)}
            </Link>

            <span>/</span>

            {pick(machine.name)}
          </div>


          {/* Main Machine Section */}
          <div className="machine-detail__layout">

            <div
              className="machine-detail__img"
              style={{
                backgroundImage: `url(${machine.image})`,
              }}
            />

            <div className="machine-detail__info">

              <div className="eyebrow">
                {pick(category.name)}
              </div>

              <h1>{pick(machine.name)}</h1>

              <p className="machine-detail__lead">
                {pick(machine.longDescription)}
              </p>

              <a className="btn" href="#contact">
                {t("detail.requestQuote")}
              </a>

            </div>

          </div>


          {/* Machine Description Image */}
          <section className="machine-description">

            <div className="machine-description__head">
              <span className="machine-description__eyebrow">
                Machine Details
              </span>

              <h2>
                {pick(machine.name)}
              </h2>
            </div>

            <div className="machine-description__image-wrapper">
              <img
                src={machine.descriptionImage}
                alt={`${pick(machine.name)} description`}
                className="machine-description__image"
              />
            </div>

          </section>


          {/* Specifications */}
          <div className="specs">

            <div className="specs__head">
              <span className="specs__eyebrow">
                {t("detail.specsEyebrow")}
              </span>

              <h2>
                {t("detail.specsTitle")}
              </h2>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}