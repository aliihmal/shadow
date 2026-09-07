import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./PizzaManakishDescriptionPage.css";

type PizzaMachine = {
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

  characteristics: {
    label: {
      en: string;
      ar: string;
    };
    value: string;
  }[];
};

export default function PizzaManakishDescriptionPage() {
  const { machineId } = useParams();
  const { pick } = useLanguage();

  const category = categories.find(
    (c) => c.id === "pizza-manakish"
  );

  if (!category) {
    return <Navigate to="/category/pizza-manakish" replace />;
  }

  const machines = category.machines as PizzaMachine[];

  const machine = machines.find(
    (m) => m.id === machineId
  );

  if (!machine) {
    return <Navigate to="/category/pizza-manakish" replace />;
  }

  const images = machine.images;

  const [selectedImage, setSelectedImage] = useState(0);

  console.log("Machine:", machine);
  console.log("Images:", images);
  console.log("Current image:", images[selectedImage]);

  return (
    <div className="page">
      <Header />

      <main className="pizza-description">
        <div className="container">

          <div className="pizza-description__back">
            <Link to="/category/pizza-manakish">
              ← Back to Pizza & Manakish Machines
            </Link>
          </div>

          <section className="pizza-description__hero">

            {/* GALLERY */}
            <div className="pizza-gallery">

              <div className="pizza-gallery__main">

                <img
                  src={images[selectedImage]}
                  alt={pick(machine.name)}
                  onLoad={() =>
                    console.log(
                      "✅ IMAGE LOADED:",
                      images[selectedImage]
                    )
                  }
                  onError={() =>
                    console.error(
                      "❌ IMAGE FAILED:",
                      images[selectedImage]
                    )
                  }
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="pizza-gallery__arrow pizza-gallery__arrow--left"
                      onClick={() =>
                        setSelectedImage(
                          selectedImage === 0
                            ? images.length - 1
                            : selectedImage - 1
                        )
                      }
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      className="pizza-gallery__arrow pizza-gallery__arrow--right"
                      onClick={() =>
                        setSelectedImage(
                          selectedImage === images.length - 1
                            ? 0
                            : selectedImage + 1
                        )
                      }
                    >
                      →
                    </button>
                  </>
                )}

              </div>

              {images.length > 1 && (
                <div className="pizza-gallery__thumbnails">

                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      className={
                        index === selectedImage
                          ? "pizza-gallery__thumbnail active"
                          : "pizza-gallery__thumbnail"
                      }
                      onClick={() =>
                        setSelectedImage(index)
                      }
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

            {/* DESCRIPTION */}
            <div className="pizza-description__content">

              <span className="pizza-description__category">
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

        </div>
      </main>

      <Footer />
    </div>
  );
}