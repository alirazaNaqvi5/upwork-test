
import "./App.css";
import FormulaAccordion from "./components/FormulaAccordion";
import { charactersList } from "./stores/formulas";

function App() {

  return (
    <>
      <div className=" bg-white rounded-md">
        <div className="flex flex-row items-center w-full justify-between px-6 py-4 jss33">
          <div className="flex items-center">
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M3 1h13v2H5v12l-5-2v-2.3L3 12V1z"></path>
              <path d="M7 15h2.13l2.296-3.635h.056L13.686 15H16l-3.325-5.077L15.945 5h-2.13L11.61 8.48h-.055L9.406 5H7.092l3.27 4.942L7 15z"></path>
            </svg>
            <div className="ml-2 text-16">Formulas ({
              charactersList.value.length
            })</div>
          </div>
          <button
            onClick={() =>
              (charactersList.value = [
                ...charactersList.value,
                {
                  id: "bender",
                  label: "New Formula",
                  description: "0",
                  content: "",
                },
              ])
            }
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            New Formula
          </button>
        </div>
        <div className="px-6 py-4">
          <FormulaAccordion />
        </div>
      </div>
    </>
  );
}

export default App;
