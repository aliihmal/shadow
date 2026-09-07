import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./TannourMachinesPage.css";

type TannourMachine = {
  id: string;

  name: {
    en: string;
    ar: string;
  };

  shortDescription: {
    en: string;
    ar: string;
  };

  longDescription: {
    en: string;
    ar: string;
  };

  image: string;

  descriptionImage?: string;

  characteristics?: {
    label: {
      en: string;
      ar: string;
    };

    value: string;
  }[];
};

export default function TannourMachinesPage() {
  const { pick } = useLanguage();

  const category = categories.find(
    (c) => c.id === "bread-production"
  );

  if (!category) return null;

  const machines = category.machines as TannourMachine[];

  return (
    <div className="page">
      <Header />

      {/* =========================
          HERO
          ========================= */}

      <section className="tannour-hero">
        <div className="container">
          <span>
            {pick(category.tagline)}
          </span>

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

      <section className="tannour-machines">
        <div className="container">

          <div className="tannour-machines__head">
            <span>
              Our Equipment
            </span>

            <h2>
              Tannour Line
            </h2>

            <p>
              Select a tannour oven to view its details and specifications.
            </p>
          </div>

          <div className="tannour-machines__grid">

            {machines.map((machine) => (
              <Link
                key={machine.id}
                to={`/category/bread-production/machine/${machine.id}`}
                className="tannour-machine-box"
              >
                <div className="tannour-machine-box__image">
                  <img
                    src={machine.image}
                    alt={pick(machine.name)}
                  />
                </div>

                <div className="tannour-machine-box__content">
                  <h3>
                    {pick(machine.name)}
                  </h3>

                  <p>
                    {pick(machine.shortDescription)}
                  </p>

                  <span>
                    View Details →
                  </span>
                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
