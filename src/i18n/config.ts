import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["path", "navigator"],
		},
		resources: {
			en: {
				translations: await import("./locales/en/translations.json"),
			},
			pl: {
				translations: await import("./locales/pl/translations.json"),
			},
		},
		ns: ["translations"],
		defaultNS: "translations",
	});

i18n.languages = ["en", "pl"];

export default i18n;
