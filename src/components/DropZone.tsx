import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import DocSelectorData from "../DocSelectorData";
import { addDocSelector } from "../redux/docSlice";
import { useAppDispatch } from "../redux/store";
import LoadingOverlay from "./LoadingOverlay";
import { useTranslation } from "react-i18next";

function DropZone() {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [isLoadingDoc, setIsLoadingDoc] = useState(false);

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			"application/pdf": [".pdf"],
		},
		onDropAccepted: async (newFiles) => {
			setIsLoadingDoc(true);
			for (let i = 0; i < newFiles.length; i++) {
				const newFile = newFiles[i];
				const document = await PDFDocument.load(
					await newFile.arrayBuffer(),
				);
				const pageCount = document.getPageCount();
				const payload: DocSelectorData = {
					document,
					filename: newFile.name,
					pageCount,
				};
				dispatch(addDocSelector(payload));
			}
			setIsLoadingDoc(false);
		},
	});

	return (
		<section className="container mx-auto px-4 drag h-60">
			{isLoadingDoc && <LoadingOverlay />}

			<div
				{...getRootProps({
					className:
						"border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 h-full",
				})}
			>
				<input {...getInputProps()} />
				<p className="text-lg font-medium mb-2">{t("dropZone")}</p>
				<p className="text-gray-500">{t("onlyPDF")}</p>
			</div>
		</section>
	);
}

export default DropZone;
