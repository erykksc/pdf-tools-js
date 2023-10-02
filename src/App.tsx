import DocSelector from "./components/DocSelector";
import DropZone from "./components/DropZone";
import MyButton from "./components/MyButton";
import TopBar from "./components/TopBar";
import { useAppSelector } from "./redux/store";

function App() {
  const pdf = useAppSelector(state => state.pdf);

  return (
    <div>
      <TopBar />
      <div className="container mx-auto px-4">
        <DropZone />
        {pdf.selectors.map((sel, index) =>
          <DocSelector key={index} dSel={sel} />
        )}
        <MyButton>
          Combine PDFs
        </MyButton>
      </div>
    </div >
  )
}

export default App;