import { useTranslation } from "react-i18next";

const LanguageButton = () => {
    const { i18n } = useTranslation();

    return (
        <button
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'pl' : 'en')}
            className='text-3xl bg-blue-100 hover:bg-blue-200 rounded-full w-14 h-14 '
        >
            {i18n.language !== 'en' ? '🇬🇧' : '🇵🇱'}
        </button>
    )
}

export default LanguageButton;