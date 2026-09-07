import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./ArabicBreadPage.css";

type ArabicMachine = {
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

export default function ArabicBreadMachinesPage() {
const { pick } = useLanguage();

const category = categories.find(
(c) => c.id === "arabic-bread"
);

if (!category) {
return null;
}

const machines = category.machines as ArabicMachine[];

return ( <div className="page"> <Header />

```
  {/* =========================
      HERO
  ========================= */}
  <section className="bread-hero">
    <div className="container bread-hero__container">

      {/* Text */}
      <div className="bread-hero__content">

        <div className="bread-hero__eyebrow">
          <span className="bread-hero__line"></span>

          <span>
            {pick(category.tagline)}
          </span>
        </div>

        <h1>
          {pick(category.name)}
        </h1>

        <p>
          {pick(category.shortDescription)}
        </p>

        <div className="bread-hero__meta">
          <span>
            Professional Bakery Equipment
          </span>

          <span className="bread-hero__dot">
            •
          </span>

          <span>
            {machines.length} Machines
          </span>
        </div>

      </div>

      {/* Image */}
      <div className="bread-hero__visual">

        <div className="bread-hero__image-wrapper">

          <img
            src={category.image}
            alt={pick(category.name)}
          />

        </div>

        <div className="bread-hero__number">
          01
        </div>

      </div>

    </div>
  </section>

  {/* =========================
      MACHINES
  ========================= */}
  <section className="bread-machines">

    <div className="container">

      <div className="bread-machines__head">

        <div>
          <span>
            Our Equipment
          </span>

          <h2>
            Arabic Bread Machines
          </h2>
        </div>

        <p>
          Select a machine to view its details.
        </p>

      </div>

      <div className="bread-machines__grid">

        {machines.map((machine) => (

          <Link
            key={machine.id}
            to={`/category/arabic-bread/machine/${machine.id}`}
            className="bread-machine-box"
          >

            <div className="bread-machine-box__image">

              <img
                src={machine.image}
                alt={pick(machine.name)}
              />

            </div>

            <div className="bread-machine-box__content">

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
