import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./PastryMachinesPage.css";

type PastryMachine = {
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

  images: string[];

  descriptionImage?: string;

  characteristics?: {
    label: {
      en: string;
      ar: string;
    };
    value: string;
  }[];
};

export default function PastryMachinesPage() {
  const { pick } = useLanguage();

  const category = categories.find(
    (c) => c.id === "pastry"
  );

  if (!category) {
    return null;
  }

  const machines = category.machines as PastryMachine[];

  return (
    <div className="page">
      <Header />

      {/* Hero */}
      <section className="pastry-hero">
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

      {/* Machines */}
      <section className="pastry-machines">
        <div className="container">

          <div className="pastry-machines__head">

            <span>
              Our Equipment
            </span>

            <h2>
              Pastry Equipment
            </h2>

            <p>
              Select a machine to view its details and photos.
            </p>

          </div>

          <div className="pastry-machines__grid">

            {machines.map((machine) => (

              <Link
                key={machine.id}
                to={`/category/pastry/machine/${machine.id}`}
                className="pastry-machine-box"
              >

                <div className="pastry-machine-box__image">

                  <img
                    src={machine.images[0]}
                    alt={pick(machine.name)}
                  />

                </div>

                <div className="pastry-machine-box__content">

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
