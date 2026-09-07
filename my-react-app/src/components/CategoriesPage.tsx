import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import categories from "../data/machines.json";
import "./CategoriesPage.css";
import { useLanguage } from "../context/LanguageContext";

function CategoriesPage() {
  const { t, pick } = useLanguage();

  return (
    <div className="page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <h1>{t("hero.title")}</h1>

            <p>{t("hero.body")}</p>

            <a className="btn-pill" href="#contact">
              {t("hero.cta")}
            </a>
          </div>

          <div className="hero__info">
            <div className="hero__info-block">
              <h4>{t("hero.hours")}</h4>
              <p>{t("hero.hoursLine1")}</p>
              <p>{t("hero.hoursLine2")}</p>
            </div>

            <div className="hero__info-block">
              <h4>{t("hero.address")}</h4>
              <p>{t("hero.addressLine1")}</p>
              <p>{t("hero.addressLine2")}</p>
            </div>

            <div className="hero__info-block">
              <h4>{t("hero.contact")}</h4>
              <p>+961 7 222 191</p>
              <p>+961 3 714 499</p>
              <p>info@shadow.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="categories">
        <div className="container">

          <div className="section-head">
            <div className="eyebrow">
              {t("categories.eyebrow")}
            </div>

            <h2>{t("categories.title")}</h2>

            <p>{t("categories.body")}</p>
          </div>

          <div className="category-grid">

            {categories.map((category) => {
  console.log(category.id, category.image);

  return (
    <Link
      key={category.id}
      to={`/category/${category.id}`}
      className="category-card"
    >
      <div
        className="category-card__img"
        style={{
          backgroundImage: `url(${category.image})`,
        }}
      />

      <div className="category-card__body">
        <span className="category-card__tagline">
          {pick(category.tagline)}
        </span>

        <h3>{pick(category.name)}</h3>

        <p>{pick(category.shortDescription)}</p>

        <span className="category-card__link">
          {t("categories.viewMachines").replace(
            "{count}",
            String(category.machines.length)
          )}{" "}
          →
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

export default CategoriesPage;