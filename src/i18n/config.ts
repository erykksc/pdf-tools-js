import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import englishTranslations from "./locales/en/translations.json";
import polishTranslations from "./locales/pl/translations.json";

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
				translations: englishTranslations,
			},
			pl: {
				translations: polishTranslations,
			},
		},
		ns: ["translations"],
		defaultNS: "translations",
	});

i18n.languages = ["en", "pl"];

export default i18n;
