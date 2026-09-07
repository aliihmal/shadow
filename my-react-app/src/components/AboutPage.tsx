
import "./AboutPage.css";
import Footer from "./Footer";
import Header from "./Header";
import { useLanguage } from "../context/LanguageContext";
function AboutPage() {
  const { t } = useLanguage();

  const stats = [
    { value: "1976", label: t("about.statFounded") },
    { value: "45+", label: t("about.statCountries") },
    { value: "50+", label: t("about.statYears") },
    { value: "500+", label: t("about.statLines") },
  ];

  const values = [
    { title: t("about.value1Title"), text: t("about.value1Body") },
    { title: t("about.value2Title"), text: t("about.value2Body") },
    { title: t("about.value3Title"), text: t("about.value3Body") },
  ];

  return (
    <div className="page">
      <Header />

      <section className="about-hero">
        <div className="container">
          <div className="eyebrow">{t("about.eyebrow")}</div>
          <h1>{t("about.title")}</h1>
          <p>{t("about.body")}</p>
        </div>
      </section>

      <section className="about-stats">
        <div className="container about-stats__grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__grid">
          <div
            className="about-story__img"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80)",
            }}
          />
          <div className="about-story__content">
            <div className="eyebrow">{t("about.storyEyebrow")}</div>
            <h2>{t("about.storyTitle")}</h2>
            <p>{t("about.storyP1")}</p>
            <p>{t("about.storyP2")}</p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t("about.valuesEyebrow")}</div>
            <h2>{t("about.valuesTitle")}</h2>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <div className="value-card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;

