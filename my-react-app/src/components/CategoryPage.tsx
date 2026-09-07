import { Link, useParams, Navigate } from "react-router-dom";
import categories from "../data/machines.json";
import "./CategoryPage.css";
import Header from "./Header";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryPage() {
const { categoryId } = useParams();
const { t, pick } = useLanguage();

const category = categories.find(
(c) => c.id === categoryId
);

if (!category) {
return <Navigate to="/" replace />;
}

/*

* Rotary Oven has its own dedicated page.
  */
  if (category.id === "rotary-oven") {
  return <Navigate to="/category/rotary-oven" replace />;
  }

/*

* Prevent errors for categories that don't
* contain a machines array.
  */
  if (!category.machines) {
  return <Navigate to="/" replace />;
  }

return ( <div className="page"> <Header />

```
  {/* =========================
      HERO
  ========================= */}

  <section className="category-hero">
    <div className="container">

      <div className="breadcrumb">
        <Link to="/">
          {t("nav.products")}
        </Link>

        <span>/</span>

        {pick(category.name)}
      </div>

      <div className="eyebrow">
        {pick(category.tagline)}
      </div>

      <h1>
        {pick(category.name)}
      </h1>

      <p>
        {pick(category.shortDescription)}
      </p>

    </div>
  </section>


  {/* =========================
      MACHINES
  ========================= */}

  <section className="machines">
    <div className="container">

      <div className="machine-grid">

        {category.machines.map((machine) => {
          /*
           * New machine structure uses `images`.
           * The first image is the main/card image.
           */
          const mainImage =
            "images" in machine && machine.images.length > 0
              ? machine.images[0]
              : "image" in machine
              ? machine.image
              : "";

          return (
            <Link
              key={machine.id}
              to={`/category/${category.id}/${machine.id}`}
              className="machine-card"
            >

              <div
                className="machine-card__img"
                style={{
                  backgroundImage: mainImage
                    ? `url(${mainImage})`
                    : "none",
                }}
              />

              <div className="machine-card__body">

                <h3>
                  {pick(machine.name)}
                </h3>

                <p>
                  {pick(machine.shortDescription)}
                </p>

                <span className="machine-card__link">
                  {t("category.seeSpecs")} →
                </span>

              </div>

            </Link>
          );
        })}

      </div>

    </div>
  </section>

  <Footer />
</div>

);
}
