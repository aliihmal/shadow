import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";

import "./MaamoulMachineDescriptionPage.css";
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

  descriptionImages?: string[]; // ✅ NEW

  characteristics?: {
    label: {
      en: string;
      ar: string;
    };
    value: string;
  }[];
};

export default function MaamoulMachineDescriptionPage() {
  const { machineId } = useParams();

  const { pick } = useLanguage();

  const [currentImage, setCurrentImage] = useState(0);

  const category = categories.find(
    (c) => c.id === "maamoul-mooncake"
  );

  if (!category) return null;

  const machines = category.machines as MaamoulMachine[];

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

      <main className="maamoul-description">

        <div className="container">

          <div className="maamoul-description__back">

            <Link to="/category/maamoul-mooncake">
              ← Back to Maamoul Machines
            </Link>

          </div>

          <section className="maamoul-description__hero">

            {/* IMAGE GALLERY */}

            <div className="maamoul-gallery">

              <div className="maamoul-gallery__main">

                <img
                  src={images[currentImage]}
                  alt={pick(machine.name)}
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="maamoul-gallery__arrow maamoul-gallery__arrow--left"
                      onClick={previousImage}
                      aria-label="Previous image"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      className="maamoul-gallery__arrow maamoul-gallery__arrow--right"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </>
                )}

              </div>

              {images.length > 1 && (
                <div className="maamoul-gallery__thumbnails">

                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className={`maamoul-gallery__thumbnail ${
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

            <div className="maamoul-description__content">

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

        
          {/* DESCRIPTION IMAGE */}

            {machine.descriptionImages &&
            machine.descriptionImages.length > 0 && (
                <section className="maamoul-description__extra-images">

                {machine.descriptionImages.map(
                    (image, index) => (
                    <div
                        className="maamoul-description__extra-image"
                        key={image}
                    >
                        <img
                        src={image}
                        alt={`${pick(machine.name)} description ${
                            index + 1
                        }`}
                        />
                    </div>
                    )
                )}

                </section>
            )}



        </div>

      </main>

      <Footer />

    </div>
  );
}
