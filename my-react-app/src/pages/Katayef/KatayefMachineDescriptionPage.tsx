import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";

import "./KatayefMachineDescriptionPage.css";

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

export default function KatayefMachineDescriptionPage() {
  const { machineId } = useParams();

  const { pick } = useLanguage();

  const [currentImage, setCurrentImage] = useState(0);

  const category = categories.find(
    (c) => c.id === "Katayf"
  );

  if (!category) return null;

  const machines = category.machines as KatayefMachine[];

  const machine = machines.find(
    (m) => m.id === machineId
  );

  if (!machine) return null;

  const images = machine.images;

  if (!images || images.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentImage((previous) =>
      previous === images.length - 1
        ? 0
        : previous + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((previous) =>
      previous === 0
        ? images.length - 1
        : previous - 1
    );
  };

  return (
    <div className="page">
      <Header />

      <main className="katayef-description">

        <div className="container">

          <div className="katayef-description__back">

            <Link to="/category/Katayf">
              ← Back to Katayef Machines
            </Link>

          </div>

          <section className="katayef-description__hero">

            {/* IMAGE GALLERY */}

            <div className="katayef-gallery">

              <div className="katayef-gallery__main">

                <img
                  src={images[currentImage]}
                  alt={pick(machine.name)}
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="katayef-gallery__arrow katayef-gallery__arrow--left"
                      onClick={previousImage}
                      aria-label="Previous image"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      className="katayef-gallery__arrow katayef-gallery__arrow--right"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </>
                )}

              </div>

              {images.length > 1 && (
                <div className="katayef-gallery__thumbnails">

                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className={`katayef-gallery__thumbnail ${
                        index === currentImage
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentImage(index)
                      }
                    >

                      <img
                        src={image}
                        alt={`${pick(machine.name)} ${
                          index + 1
                        }`}
                      />

                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* MACHINE INFORMATION */}

            <div className="katayef-description__content">

              <span>
                {pick(category.name)}
              </span>

              <h1>
                {pick(machine.name)}
              </h1>

              <p>
                {pick(machine.longDescription)}
              </p>

           
            </div>

          </section>

          {/* CHARACTERISTICS */}

        </div>

      </main>

      <Footer />
    </div>
  );
}
