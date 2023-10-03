import { PDFDocument } from "pdf-lib";

export default interface DocSelectorData {
	id: number | undefined; // undefined for new selectors, is set by the reducer
	document: PDFDocument;
	filename: string;
	startPage: number;
	endPage: number;
	pageCount: number;
}
