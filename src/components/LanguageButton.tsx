import { useTranslation } from "react-i18next";

const LanguageButton = () => {
	const { i18n } = useTranslation();

	return (
		<button
			onClick={() =>
				i18n.changeLanguage(
					i18n.resolvedLanguage === "en" ? "pl" : "en",
				)
			}
			className="text-3xl bg-sky-300 hover:bg-sky-500 rounded-full w-14 h-14 "
		>
			{i18n.resolvedLanguage === "en" ? "🇬🇧" : "🇵🇱"}
		</button>
	);
};

export default LanguageButton;
