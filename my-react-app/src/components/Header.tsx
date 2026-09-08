import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import categories from "../data/machines.json";
import { useLanguage } from "../context/LanguageContext";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const location = useLocation();

  const { language, setLanguage, t, pick } = useLanguage();

  const productsActive = location.pathname.startsWith("/category");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const chooseLanguage = (lang: "en" | "ar") => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">

        {/* Logo */}
        <Link
          to="/"
          className="site-header__logo"
          onClick={closeMenu}
        >
          <img
            src="/RealLogoAgain.jpeg"
            alt="Shadow Bakery Equipment"
            className="site-header__logo-image"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="site-header__nav">

          <NavLink to="/" end className="nav-link">
            {t("nav.home")}
          </NavLink>

          <NavLink to="/about" className="nav-link">
            {t("nav.about")}
          </NavLink>

          {/* Products Dropdown */}
          <div className="nav-item nav-item--dropdown">
            <span
              className={`nav-link ${
                productsActive ? "nav-link--active" : ""
              }`}
            >
              {t("nav.products")}

              <svg
                className="nav-chevron"
                viewBox="0 0 12 8"
                width="10"
                height="7"
              >
                <path
                  d="M1 1l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
              </svg>
            </span>

            <div className="dropdown-menu">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="dropdown-menu__item"
                >
                  <span className="dropdown-menu__name">
                    {pick(category.name)}
                  </span>

                  <span className="dropdown-menu__count">
                    {category.machines.length}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link--active" : ""}`
            }
          >
            {t("nav.contact")}
          </NavLink>
        </nav>

        {/* Header Actions */}
        <div className="site-header__actions">

          {/* Phone */}
          <a
            href="tel:+9613714499"
            className="icon-btn"
            aria-label="Call us"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
            >
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.9c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1.1L6.6 10.8Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:alihamza637376@gmail.com"
            className="icon-btn"
            aria-label="Email us"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />

              <path
                d="M4 7l8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
          </a>

          {/* Language Switcher */}
          <div
            className="lang-select"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              type="button"
              className="lang-select__btn"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              {language === "ar" ? "AR" : "EN"}

              <svg
                className="nav-chevron"
                viewBox="0 0 12 8"
                width="10"
                height="7"
              >
                <path
                  d="M1 1l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
              </svg>
            </button>

            <div
              className={`lang-menu ${
                langOpen ? "lang-menu--open" : ""
              }`}
            >
              <button
                type="button"
                className={`lang-menu__item ${
                  language === "en"
                    ? "lang-menu__item--active"
                    : ""
                }`}
                onClick={() => chooseLanguage("en")}
              >
                English
              </button>

              <button
                type="button"
                className={`lang-menu__item ${
                  language === "ar"
                    ? "lang-menu__item--active"
                    : ""
                }`}
                onClick={() => chooseLanguage("ar")}
              >
                العربية
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${
              menuOpen ? "hamburger--open" : ""
            }`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`mobile-backdrop ${
          menuOpen ? "mobile-backdrop--visible" : ""
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`mobile-sidebar ${
          menuOpen ? "mobile-sidebar--open" : ""
        }`}
      >

        {/* Sidebar Header */}
        <div className="mobile-sidebar__head">

          <Link
            to="/"
            className="mobile-sidebar__logo"
            onClick={closeMenu}
          >
            <img
              src="/RealLogoAgain.jpeg"
              alt="Shadow Bakery Equipment"
              className="mobile-sidebar__logo-image"
            />
          </Link>

          <button
            className="mobile-sidebar__close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="mobile-sidebar__nav">

          <NavLink
            to="/"
            end
            className="mobile-link"
            onClick={closeMenu}
          >
            {t("nav.home")}
          </NavLink>

          <NavLink
            to="/about"
            className="mobile-link"
            onClick={closeMenu}
          >
            {t("nav.about")}
          </NavLink>

          {/* Products */}
          <div className="mobile-sidebar__group-label">
            {t("nav.products")}
          </div>

          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="mobile-link mobile-link--sub"
              onClick={closeMenu}
            >
              {pick(category.name)}
            </Link>
          ))}

          <a
            href="#updates"
            className="mobile-link"
            onClick={closeMenu}
          >
            {t("nav.updates")}
          </a>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `mobile-link ${
                isActive ? "nav-link--active" : ""
              }`
            }
            onClick={closeMenu}
          >
            {t("nav.contact")}
          </NavLink>

          {/* Language */}
          <div className="mobile-sidebar__group-label">
            {language === "ar" ? "اللغة" : "Language"}
          </div>

          <div className="mobile-lang-toggle">

            <button
              type="button"
              className={
                language === "en"
                  ? "mobile-lang-toggle__btn--active"
                  : "mobile-lang-toggle__btn"
              }
              onClick={() => chooseLanguage("en")}
            >
              English
            </button>

            <button
              type="button"
              className={
                language === "ar"
                  ? "mobile-lang-toggle__btn--active"
                  : "mobile-lang-toggle__btn"
              }
              onClick={() => chooseLanguage("ar")}
            >
              العربية
            </button>

          </div>
        </nav>

        {/* Mobile Footer */}
        <div className="mobile-sidebar__footer">

          <a href="tel:+9615433772">
            +961 7 222 191
          </a>

          <a href="mailto:info@bakrico.com">
            info@shadow.com
          </a>

        </div>
      </aside>
    </header>
  );
}
