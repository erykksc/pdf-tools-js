import { useTranslation } from "react-i18next";

export default function TopBar() {
	const { t } = useTranslation();
	return (
		<div className="bg-gray-800 text-white p-2 flex flex-col items-center">
			<span className="font-bold text-2xl">PDF tools js</span>
			<span className="text-xs">
				{t("createdBy")}{" "}
				<a href="https://github.com/eroar">Eryk Ksciuczyk</a>
			</span>
		</div>
	);
}
