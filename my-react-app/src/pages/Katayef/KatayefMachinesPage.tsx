import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./KatayefMachinesPage.css";

type KatayefMachine = {
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

  characteristics?: {
    label: {
      en: string;
      ar: string;
    };
    value: string;
  }[];
};

export default function KatayefMachinesPage() {
  const { pick } = useLanguage();

  const category = categories.find(
    (c) => c.id === "Katayf"
  );

  if (!category) return null;

  const machines = category.machines as KatayefMachine[];

  return (
    <div className="page">
      <Header />

      <section className="katayef-hero">
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

      <section className="katayef-machines">
        <div className="container">

          <div className="katayef-machines__head">

            <span>
              Our Equipment
            </span>

            <h2>
              Katayef Machines
            </h2>

            <p>
              Select a machine to view its details and photos.
            </p>

          </div>

          <div className="katayef-machines__grid">

            {machines.map((machine) => (

              <Link
                key={machine.id}
                to={`/category/Katayf/machine/${machine.id}`}
                className="katayef-machine-box"
              >

                <div className="katayef-machine-box__image">

                  <img
                    src={machine.images[0]}
                    alt={pick(machine.name)}
                  />

                </div>

                <div className="katayef-machine-box__content">

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
