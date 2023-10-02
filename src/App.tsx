import { useState } from "react";
import DangerButton from "./components/DangerButton";
import DocSelector from "./components/DocSelector";
import DropZone from "./components/DropZone";
import PrimaryButton from "./components/PrimaryButton";
import TopBar from "./components/TopBar";
import { clearDocSelectors, updateDocSelector } from "./redux/docSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { combinePDFs, downloadFile } from "./utils";

function App() {
  const pdf = useAppSelector(state => state.pdf);
  const dispatch = useAppDispatch();

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleGeneratePDFButton = () => {
    setIsGeneratingPDF(true);
    combinePDFs(pdf.selectors).then((pdfBytes) => {
      downloadFile('combined.pdf', 'application/pdf', pdfBytes);
      setIsGeneratingPDF(false);
    }, (reason) => {
      if (reason === Error('Filename not chosen')) {
        alert('Choose filename');
      }
    });
  }

  return (
    <div>
      <TopBar />
      {isGeneratingPDF && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className="container mx-auto px-4 pt-10">
        <div className="flex flex-col items-center" >
          <div className="max-w-2xl">
            {pdf.selectors.map((data, index) =>
              <div key={index}>
                <DocSelector
                  data={data}
                  onStartPageChange={(startPage) => dispatch(updateDocSelector({ index, data: { ...data, startPage } }))}
                  onEndPageChange={(endPage) => dispatch(updateDocSelector({ index, data: { ...data, endPage } }))}
                />
                <div className="pb-3" />
              </div>
            )}
          </div>

          <DropZone />
          <div className="pb-5" />
          <PrimaryButton
            onClick={handleGeneratePDFButton}
            disabled={pdf.selectors.length === 0}
          >
            Combine PDFs
          </PrimaryButton>
          <div className="pb-3" />


          <div className="fixed bottom-3 left-3">
            <DangerButton
              onClick={() => dispatch(clearDocSelectors())}
              disabled={pdf.selectors.length === 0}
            >
              Clear
            </DangerButton>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App;