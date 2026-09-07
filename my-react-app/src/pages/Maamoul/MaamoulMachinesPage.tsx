import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./MaamoulMachinesPage.css";

type MaamoulMachine = {
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

export default function MaamoulMachinesPage() {
  const { pick } = useLanguage();

  const category = categories.find(
    (c) => c.id === "maamoul-mooncake"
  );

  if (!category) return null;

  const machines = category.machines as MaamoulMachine[];

  return (
    <div className="page">
      <Header />

      <section className="maamoul-hero">
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

      <section className="maamoul-machines">
        <div className="container">

          <div className="maamoul-machines__head">

            <span>
              Our Equipment
            </span>

            <h2>
              Maamoul Machines
            </h2>

            <p>
              Select a machine to view its details and photos.
            </p>

          </div>

          <div className="maamoul-machines__grid">

            {machines.map((machine) => (
              <Link
                key={machine.id}
                to={`/category/maamoul-mooncake/machine/${machine.id}`}
                className="maamoul-machine-box"
              >

                <div className="maamoul-machine-box__image">

                  <img
                    src={machine.images[0]}
                    alt={pick(machine.name)}
                  />

                </div>

                <div className="maamoul-machine-box__content">

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
