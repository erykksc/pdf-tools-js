import React, { ChangeEvent, DragEvent } from 'react';
import { PDFDocument } from "pdf-lib";
import FileBar from './FileBar/FileBar'
import GenerateBtn from './GenerateBtn'
import './App.css'
import SelectorBar from './SelectorBar/SelectorBar';
import autoBindReact from 'auto-bind/react';
import PDFSelector from './PDFSelector';
import { cloneDeep } from 'lodash';

interface IAppProps {
}

interface IAppState {
  pdfs: File[];
  pdfSelectors: PDFSelector[];
  isFileDragged: boolean;
  generatingPdf: boolean;
  fileName: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      pdfs: [],
      pdfSelectors: [],
      isFileDragged: false,
      generatingPdf: false,
      fileName: ''
    };
    autoBindReact(this);
  }

  handleDragStart(e: DragEvent<HTMLDivElement>) {
    this.setState({ isFileDragged: true });
  }

  handleDragEnd(e: DragEvent<HTMLDivElement>) {
    this.setState({ isFileDragged: false });
  }

  handleFileAdd(file: File) {
    // if file already in this.state.pdfs, return, else add the pdf to the array
    for (let i = 0; i < this.state.pdfs.length; i++) {
      if (this.state.pdfs[i].name === file.name) {
        alert("PDF with same name already added");
        return;
      }
    }
    this.setState({ pdfs: [...this.state.pdfs, file] });
  }

  handleFileRemove(file: File) {
    // remove file from this.state.pdfs
    this.setState({ pdfs: this.state.pdfs.filter((pdf) => pdf.name !== file.name) });
  }

  handleGeneratePDFButton() {
    if (this.state.pdfSelectors.length === 0) {
      alert('Select some pdf pages');
      return;
    }
    for (const sel of this.state.pdfSelectors) {
      if (!sel.isValid) {
        alert('Encountered problems with selectors, check your page selectors');
        return;
      }
    }
    this.setState({ generatingPdf: true });
    this.generatePDF().then((pdfBytes) => {
      this.downloadFile(pdfBytes);
      this.setState({ generatingPdf: false });
    });
  }

  async generatePDF(): Promise<Uint8Array> {
    const pdfDocs: { [key: string]: PDFDocument } = {};
    const finalPDF = await PDFDocument.create();
    // adds pages to finalPDF
    for (const sel of this.state.pdfSelectors) {
      let pdfDoc;
      // loads file if not already loaded
      if (!(sel.file.name in pdfDocs)) {
        const pdfBytes = await sel.file.arrayBuffer();
        pdfDoc = await PDFDocument.load(pdfBytes);
        pdfDocs[sel.file.name] = pdfDoc;
      }
      else {
        pdfDoc = pdfDocs[sel.file.name];
      }
      const indices = [...Array(sel.endPage).keys()].slice(sel.startPage - 1);
      const pagesToAdd = await finalPDF.copyPages(pdfDoc, indices);
      for (const page of pagesToAdd) {
        finalPDF.addPage(page);
      }
    }
    const finalPDFBytes = await finalPDF.save();
    return finalPDFBytes
  }

  downloadFile(pdfBytes: Uint8Array) {
    // downloads the file
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = this.state.fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  handleSelectorAdd(fileName: string) {
    const pdf = this.state.pdfs.find((pdf) => pdf.name === fileName);
    if (pdf) {
      const sel = new PDFSelector(pdf);
      // adds the selector to state
      this.setState({ pdfSelectors: [...this.state.pdfSelectors, sel] });
    }
  }

  handleSelectorRemove(sel: PDFSelector) {
    // remove selector from this.state.pdfSelectors
    this.setState({ pdfSelectors: this.state.pdfSelectors.filter((x) => x.id !== sel.id) });
  }

  handleSelectorChange(sel: PDFSelector, newPageSelection: string) {
    const selIndex = this.state.pdfSelectors.findIndex((x) => x.id === sel.id);
    if (selIndex === -1) {
      throw Error('Selector that was changed doesn\'t exist anymore');
    }

    const updatedSel = this.state.pdfSelectors[selIndex].copy();
    updatedSel.inputStr = newPageSelection;
    this.setState({ pdfSelectors: [...this.state.pdfSelectors.slice(0, selIndex), updatedSel, ...this.state.pdfSelectors.slice(selIndex + 1)] });
  }

  handleSelectorMove(sel: PDFSelector, newIndex: number) {
    // TODO
    const pdfSels = cloneDeep(this.state.pdfSelectors);
    const oldIndex = pdfSels.findIndex((x) => x.id === sel.id);
    if (newIndex <= oldIndex) {
      pdfSels.splice(oldIndex, 1);
      pdfSels.splice(newIndex, 0, sel);
    }
    else {
      pdfSels.splice(newIndex, 0, sel);
      pdfSels.splice(oldIndex, 1);
    }
  }

  handleFileNameChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ fileName: e.target.value });
  }

  render() {
    return (
      <div
        className="App pt-3"
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      >
        <div className="container">
          <div className="row justify-content-center"><h2>Source PDF files</h2></div>
          <div className="row my-5 r justify-content-center">
            <FileBar
              pdfs={this.state.pdfs}
              onFileAdd={this.handleFileAdd}
              onFileRemove={this.handleFileRemove}
            />
          </div>
          <div className="row justify-content-center">{this.state.pdfs.length !== 0 && <h2>New PDF</h2>}</div>
          <div className="row justify-content-center">
            <label htmlFor="filename-field">filename:</label>
            <input
              type="text"
              onChange={this.handleFileNameChange}
              id="filename-field"
              value={this.state.fileName}
            />
          </div>
          <div className="row my-2 justify-content-center">
            <SelectorBar
              isFileDragged={this.state.isFileDragged}
              selectors={this.state.pdfSelectors}
              onSelectorAdd={this.handleSelectorAdd}
              onSelectorRemove={this.handleSelectorRemove}
              onSelectorChange={this.handleSelectorChange}
              onSelectorMove={this.handleSelectorMove}
            />
          </div>
          <div className="row pt-2 pt-5 justify-content-center">{this.state.pdfs.length !== 0 && <GenerateBtn onClick={this.handleGeneratePDFButton} />}</div>
        </div>
      </div>
    );
  }
}