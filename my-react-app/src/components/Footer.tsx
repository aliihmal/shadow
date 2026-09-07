import { Link } from "react-router-dom";
import "./Footer.css";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" id="contact">
      <div className="container site-footer__grid">
        <div>
          <div className="site-footer__logo">
            Sha<span>Dow</span>
          </div>
          <p>{t("footer.tagline")}</p>
        </div>
        <div>
          <h4>{t("footer.navigation")}</h4>
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/about">{t("nav.about")}</Link>
          <a href="#contact">{t("nav.contact")}</a>
        </div>
        <div>
          <h4>{t("footer.contact")}</h4>
          <p>Lebanon</p>
          <p>WhatsApp:+961 3 714 499</p>
          <p>Email: info@shadow.com</p>
        </div>
      </div>
      <div className="site-footer__copy">
        © 2026  SHADOW. {t("footer.rights")}
      </div>
    </footer>
  );
}