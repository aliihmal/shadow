import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./TannourMachineDescriptionPage.css";

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

export default function TannourMachineDescriptionPage() {
  const { machineId } = useParams();

  const { pick } = useLanguage();

  const category = categories.find(
    (c) => c.id === "bread-production"
  );

  if (!category) return null;

  const machines = category.machines as TannourMachine[];

  const machine = machines.find(
    (m) => m.id === machineId
  );

  if (!machine) return null;

  return (
    <div className="page">
      <Header />

      <main className="tannour-description">
        <div className="container">

          <div className="tannour-description__back">
            <Link to="/category/bread-production">
              ← Back to Tannour Line
            </Link>
          </div>

          <section className="tannour-description__hero">

            <div className="tannour-description__image">
              <img
                src={machine.image}
                alt={pick(machine.name)}
              />
            </div>

            <div className="tannour-description__content">

              <span>
                {pick(category.name)}
              </span>

              <h1>
                {pick(machine.name)}
              </h1>

              <p>
                {pick(machine.longDescription)}
              </p>

     ``

            </div>

          </section>


          {machine.descriptionImage && (
            <section className="tannour-description__extra-image">

              <img
                src={machine.descriptionImage}
                alt={`${pick(machine.name)} description`}
              />

            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
