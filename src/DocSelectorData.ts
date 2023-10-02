import { PDFDocument } from "pdf-lib";

export default interface DocSelectorData {
	document: PDFDocument;
	filename: string;
	startPage: number;
	endPage: number;
	pageCount: number;
}
