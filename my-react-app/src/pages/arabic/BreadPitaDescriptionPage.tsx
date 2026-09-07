import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import categories from "../../data/machines.json";
import { useLanguage } from "../../context/LanguageContext";
import "./BreadPitaDescriptionPage.css";

type BreadMachine = {
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

export default function BreadPitaDescriptionPage() {
const { machineId } = useParams();
const { pick } = useLanguage();

const [selectedImage, setSelectedImage] = useState<string | null>(null);

// Get Arabic Bread category
const category = categories.find(
(c) => c.id === "arabic-bread"
);

if (!category) {
return null;
}

// Get Arabic bread machines
const machines = category.machines as BreadMachine[];

// Find machine from URL
const machine = machines.find(
(m) => m.id === machineId
);

if (!machine) {
return null;
}

// All machine images
const machineImages =
machine.images && machine.images.length > 0
? machine.images
: [machine.image];

// Currently selected image
const activeImage =
selectedImage || machineImages[0];

return ( <div className="page"> <Header />

```
  <main className="bread-description">
    <div className="container">

      {/* =========================
          BACK
      ========================= */}
      <div className="bread-description__back">
        <Link to="/category/arabic-bread">
          ← Back to Arabic Bread Machines
        </Link>
      </div>

      {/* =========================
          MACHINE HERO
      ========================= */}
      <section className="bread-description__hero">

        {/* =========================
            IMAGE GALLERY
        ========================= */}
        <div className="bread-description__gallery">

          {/* Main Image */}
          <div className="bread-description__image">
            <img
              src={activeImage}
              alt={pick(machine.name)}
            />
          </div>

          {/* Thumbnails */}
          {machineImages.length > 1 && (
            <div className="bread-description__thumbnails">

              {machineImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`bread-description__thumbnail ${
                    activeImage === image
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
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

        {/* =========================
            DESCRIPTION
        ========================= */}
        <div className="bread-description__content">

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

      {/* =========================
          CHARACTERISTICS
      ========================= */}
      
      {/* =========================
          DESCRIPTION IMAGE
      ========================= */}
      {machine.descriptionImage && (
        <section className="bread-description__extra-image">

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
