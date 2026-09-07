import {  useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./PackagingMachineDescriptionPage.css";

type PackagingMachine = {
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

  descriptionImages?: string[];

  characteristics?: {
    label: {
      en: string;
      ar: string;
    };
    value: string;
  }[];
};

export default function PackagingMachineDescriptionPage() {
  const { machineId } = useParams();

  const { pick } = useLanguage();

  const [currentImage, setCurrentImage] = useState(0);

  const category = categories.find(
    (c) => c.id === "packaging-machines"
  );

  if (!category) return null;

  const machines = category.machines as PackagingMachine[];

  const machine = machines.find(
    (m) => m.id === machineId
  );

  if (!machine) return null;

  const images = machine.images;

  if (!images || images.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  return (
    <div className="page">
      <Header />

      <main className="packaging-description">
        <div className="container">

          {/* BACK */}
          <div className="packaging-description__back">
            <Link to="/category/packaging-machines">
              ← Back to Packaging Machines
            </Link>
          </div>

          {/* MACHINE */}
          <section className="packaging-description__hero">

            {/* GALLERY */}
            <div className="packaging-description__gallery">

              <div className="packaging-description__main-image">

                <img
                  src={images[currentImage]}
                  alt={`${pick(machine.name)} ${currentImage + 1}`}
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="packaging-gallery__arrow packaging-gallery__arrow--left"
                      onClick={previousImage}
                      aria-label="Previous image"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      className="packaging-gallery__arrow packaging-gallery__arrow--right"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </>
                )}

              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="packaging-description__thumbnails">

                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={image}
                      className={`packaging-thumbnail ${
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
                        alt={`${pick(machine.name)} thumbnail ${
                          index + 1
                        }`}
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* INFORMATION */}
            <div className="packaging-description__content">

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
          {machine.characteristics &&
            machine.characteristics.length > 0 && (
              <section className="packaging-characteristics">

                <div className="packaging-characteristics__head">
                  <span>Specifications</span>

                  <h2>
                    Machine Characteristics
                  </h2>
                </div>

                <div className="packaging-characteristics__grid">

                  {machine.characteristics.map(
                    (item) => (
                      <div
                        className="packaging-characteristic"
                        key={item.label.en}
                      >
                        <span>
                          {pick(item.label)}
                        </span>

                        <strong>
                          {item.value}
                        </strong>
                      </div>
                    )
                  )}

                </div>

              </section>
            )}

          {/* DESCRIPTION IMAGES */}
          {machine.descriptionImages &&
            machine.descriptionImages.length > 0 && (
              <section className="packaging-description__extra-images">

                {machine.descriptionImages.map(
                  (image, index) => (
                    <div
                      className="packaging-description__extra-image"
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
