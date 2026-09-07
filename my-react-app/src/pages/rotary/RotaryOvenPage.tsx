import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./RotaryOvenPage.css";

type RotaryOvenMachine = {
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

  characteristics?: {
    label: {
      en: string;
      ar: string;
    };

    value: string;
  }[];
};

type RotaryOvenCategory = {
  id: string;

  name: {
    en: string;
    ar: string;
  };

  tagline: {
    en: string;
    ar: string;
  };

  shortDescription: {
    en: string;
    ar: string;
  };

  image: string;

  machines: RotaryOvenMachine[];
};

export default function RotaryOvenPage() {
  const { pick } = useLanguage();

  const rotaryOven = categories.find(
    (category) => category.id === "rotary-oven"
  ) as RotaryOvenCategory | undefined;

  if (!rotaryOven) return null;

  /*
   * Rotary Oven contains one machine
   * with multiple images.
   */
  const machine = rotaryOven.machines[0];

  if (!machine) return null;

  return (
    <div className="page">
      <Header />

      {/* =========================
          HERO
          ========================= */}

      <section className="rotary-hero">
        <div className="container">

          <span>
            {pick(rotaryOven.tagline)}
          </span>

          <h1>
            {pick(rotaryOven.name)}
          </h1>

          <p>
            {pick(rotaryOven.shortDescription)}
          </p>

        </div>
      </section>


      {/* =========================
          ROTARY OVEN
          ========================= */}

      <section className="rotary-section">
        <div className="container">

          <div className="rotary-section__head">

            <span>
              Our Equipment
            </span>

            <h2>
              {pick(machine.name)}
            </h2>

            <p>
              {pick(machine.shortDescription)}
            </p>

          </div>


          {/* =========================
              IMAGE GALLERY
              ========================= */}

          <div className="rotary-gallery">

            {machine.images.map((image, index) => (
              <div
                className="rotary-gallery__image"
                key={image}
              >
                <img
                  src={image}
                  alt={`${pick(machine.name)} ${index + 1}`}
                />
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
