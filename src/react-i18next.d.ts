import "react-i18next";
import en from "../public/locales/en.json";
import fr from "../public/locales/fr.json";

declare module "react-i18next" {
  interface Resources {
    en: typeof en;
    fr: typeof fr;
  }
}
