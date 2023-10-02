import { PDFDocument } from "pdf-lib";

export async function getPDFPageCount(pdf: File): Promise<number> {
	const pdfBytes = await pdf.arrayBuffer();
	if (pdfBytes) {
		const pdfDoc = await PDFDocument.load(pdfBytes);
		return pdfDoc.getPageCount();
	} else {
		return Promise.reject("Error while loading the PDF");
	}
}
