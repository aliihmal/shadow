import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./PastryMachineDetails.css";

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

export default function PastryMachineDetails() {
  const { machineId } = useParams();
  const { pick } = useLanguage();

  const [currentImage, setCurrentImage] = useState(0);

  // Always use the pastry category directly
  const category = categories.find(
    (c) => c.id === "pastry"
  );

  if (!category) {
    return null;
  }

  // Get pastry machines
  const machines = category.machines as PastryMachine[];

  // Find the machine from the URL
  const machine = machines.find(
    (m) => m.id === machineId
  );

  if (!machine) {
    return null;
  }

  const images = machine.images;

  if (!images || images.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="page">
      <Header />

      <main className="pastry-description">
        <div className="container">

          {/* Back */}
          <div className="pastry-description__back">
            <Link to="/category/pastry">
              ← Back to Pastry Equipment
            </Link>
          </div>

          {/* Main machine section */}
          <section className="pastry-description__hero">

            {/* Gallery */}
            <div className="pastry-gallery">

              {/* Main image */}
              <div className="pastry-gallery__main">

                <img
                  src={images[currentImage]}
                  alt={pick(machine.name)}
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="pastry-gallery__arrow pastry-gallery__arrow--left"
                      onClick={previousImage}
                      aria-label="Previous image"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      className="pastry-gallery__arrow pastry-gallery__arrow--right"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="pastry-gallery__thumbnails">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className={`pastry-gallery__thumbnail ${
                        index === currentImage
                          ? "active"
                          : ""
                      }`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${pick(machine.name)} ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Description */}
            <div className="pastry-description__content">

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


          {/* Optional description image */}
          {machine.descriptionImage && (
            <section className="pastry-description__extra-image">
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
