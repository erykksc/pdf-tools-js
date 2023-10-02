import { PDFDocument } from "pdf-lib";
import DocSelectorData from "./DocSelectorData";

export async function getPDFPageCount(pdf: File): Promise<number> {
	const pdfBytes = await pdf.arrayBuffer();
	if (pdfBytes) {
		const pdfDoc = await PDFDocument.load(pdfBytes);
		return pdfDoc.getPageCount();
	} else {
		return Promise.reject("Error while loading the PDF");
	}
}

export async function combinePDFs(
	selectors: DocSelectorData[]
): Promise<Uint8Array> {
	const finalPDF = await PDFDocument.create();
	// adds pages to finalPDF
	for (const sel of selectors) {
		// loads file if not already loaded
		const pdfDoc = sel.document;

		const indices = [...Array(sel.endPage).keys()].slice(sel.startPage - 1);
		const pagesToAdd = await finalPDF.copyPages(pdfDoc, indices);
		for (const page of pagesToAdd) {
			finalPDF.addPage(page);
		}
	}
	const finalPDFBytes = await finalPDF.save();
	return finalPDFBytes;
}

export function downloadFile(
	filename: string,
	mimeType: string,
	pdfBytes: Uint8Array
) {
	// downloads the file
	const blob = new Blob([pdfBytes], { type: mimeType });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.style.display = "none";
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
	document.body.removeChild(a);
}
