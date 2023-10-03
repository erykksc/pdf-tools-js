import { PDFDocument } from "pdf-lib";

export default interface DocSelectorData {
	id:number;
	document: PDFDocument;
	filename: string;
	startPage: number;
	endPage: number;
	pageCount: number;
}
