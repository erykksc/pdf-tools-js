import { useState } from "react";
import { useTranslation } from "react-i18next";
import { List } from "react-movable";
import DangerButton from "./components/DangerButton";
import DocSelector from "./components/DocSelector";
import DropZone from "./components/DropZone";
import LanguageButton from "./components/LanguageButton";
import LoadingOverlay from "./components/LoadingOverlay";
import PrimaryButton from "./components/PrimaryButton";
import TopBar from "./components/TopBar";
import {
	clearDocSelectors,
	reorderDocSelectors,
	updateDocSelector,
} from "./redux/docSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { combinePDFs, downloadFile } from "./utils";

function App() {
	const pdf = useAppSelector((state) => state.pdf);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

	const handleGeneratePDFButton = () => {
		setIsGeneratingPDF(true);
		combinePDFs(pdf.selectors).then((pdfBytes) => {
			setIsGeneratingPDF(false);
			downloadFile("combined.pdf", "application/pdf", pdfBytes);
		}, alert);
	};

	return (
		<div className="min-h-screen dark:bg-gray-900 dark:text-white">
			<TopBar />
			{isGeneratingPDF && <LoadingOverlay />}
			<main className="container mx-auto px-4 pt-10">
				<div className="flex flex-col items-center">
					{/* SELECTORS */}
					<List
						values={pdf.selectors}
						onChange={({ oldIndex, newIndex }) =>
							dispatch(
								reorderDocSelectors({ oldIndex, newIndex }),
							)
						}
						renderList={({ children, props }) => (
							<div {...props} className="max-w-2xl">
								{" "}
								{children}
							</div>
						)}
						renderItem={({ value, props }) => (
							<div {...props} className="pb-3">
								<DocSelector
									data={value}
									onStartPageChange={(startPage) =>
										dispatch(
											updateDocSelector({
												...value,
												startPage,
											}),
										)
									}
									onEndPageChange={(endPage) =>
										dispatch(
											updateDocSelector({
												...value,
												endPage,
											}),
										)
									}
								/>
							</div>
						)}
					/>

					{/* DROP ZONE */}
					<DropZone />
					<div className="pb-5" />

					{/* COMBINE BUTTON */}
					<PrimaryButton
						onClick={handleGeneratePDFButton}
						disabled={
							isGeneratingPDF ||
							pdf.selectors.length === 0 ||
							pdf.selectors.every(
								(selector) => selector.errorMsg !== undefined,
							)
						}
					>
						{isGeneratingPDF
							? t("generatingPDF")
							: t("combinePDFs")}
					</PrimaryButton>
					<div className="pb-3" />

					{/* CLEAR BUTTON */}
					<div className="fixed bottom-3 left-3">
						<DangerButton
							onClick={() => dispatch(clearDocSelectors())}
							disabled={
								pdf.selectors.length === 0 || isGeneratingPDF
							}
						>
							{t("clear")}
						</DangerButton>
					</div>

					{/* Language Button */}
					<div className="fixed bottom-3 right-3">
						<LanguageButton />
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
