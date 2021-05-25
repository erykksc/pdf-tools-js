import autoBind from "auto-bind";
import { PDFDocument } from "pdf-lib";

interface IIndexable {
    [key: string]: any;
}

export default class PDFSelector implements IIndexable {
    static selectorCount = 0;
    id: number;
    file: File;
    pageCount: number = 0;
    _inputStr: string = '';
    startPage: number = 1;
    endPage: number = 0;
    errorMsg: string = '';


    constructor(pdfFile: File) {
        autoBind(this);
        this.id = PDFSelector.selectorCount;
        PDFSelector.selectorCount += 1;
        this.file = pdfFile;
        this._getPageCount().then((count) => {
            this.pageCount = count;
            if (this.endPage === 0) {
                this.endPage = count;
            }
        })
    }

    async _getPageCount(): Promise<number> {
        const pdfBytes = await this.file.arrayBuffer();
        if (pdfBytes) {
            const pdfDoc = await PDFDocument.load(pdfBytes);
            return pdfDoc.getPageCount();

        } else {
            return Promise.reject("Error while loading the PDF")
        }
    }

    copy(): PDFSelector {
        const sel = new PDFSelector(this.file);
        for (const [key, value] of Object.entries(this)) {
            if (!(value instanceof Function)) {
                // @ts-ignore
                sel[key] = value;
            }
        }
        return sel;
    }

    checkForErrors() {
        // sets errorMsg field if anything is wrong
        this.errorMsg = '';
        this.parseInputStr();
        if (!this.isValid) {
            return;
        }
        else if (this.endPage < this.startPage) {
            this.errorMsg = 'First page can\'t be higher than the last page';
        }
        else if (this.startPage < 1) {
            this.errorMsg = 'First page must be at least 1';
        }
        else if (this.endPage > this.pageCount) {
            this.errorMsg = 'Last page can\'t be greater than the PDF page count';
        }
        else if (this.startPage > this.pageCount) {
            this.errorMsg = 'First page can\'t be greater than the PDF page count';
        }
    }

    get inputStr() {
        return this._inputStr;
    }

    set inputStr(newInputStr: string) {
        this._inputStr = newInputStr;
        this.checkForErrors();
    }

    get isValid() {
        return this.errorMsg.length === 0;
    }

    parseInputStr() {
        // regex for matching pages in patterns like:
        //      startPage-endPage (':' can be used instead of dash)
        //      startPage-
        //      -endPage
        //      singlePage
        if (this._inputStr === '' || this._inputStr==='-' || this._inputStr===':') {
            this.startPage = 1;
            this.endPage = this.pageCount;
            return;
        }
        const re = /(?:^(\d*?)[:-](\d*$))|(^\d+?$)/;
        const match = this._inputStr.match(re);
        if (match) {
            const parsedStartPage = parseInt(match[1], 10);
            const parsedEndPage = parseInt(match[2], 10);
            const parsedSinglePage = parseInt(match[3], 10);
            // Single Page Case
            // example: 4
            if (match[3]) {
                this.startPage = parsedSinglePage;
                this.endPage = parsedSinglePage;
            }
            // From page to end
            // example: 2:
            else if (match[1] && !match[2]) {
                this.startPage = parsedStartPage;
                this.endPage = this.pageCount;
            }
            // From beggining to end
            // example: :3
            else if (!match[1] && match[2]) {
                this.startPage = 1;
                this.endPage = parsedEndPage;
            }
            // From page to page
            // example: 1:5
            else if (match[1] && match[2]) {
                this.startPage = parsedStartPage;
                this.endPage = parsedEndPage;
            }
            else {
                throw Error(`Unexpected input value ${this._inputStr}`);
            }
        }
        else {
            this.errorMsg = 'Invalid format of the input value';
        }
    }
}