import { useEffect } from "react";
import { parseCSV } from "./utilities/parseCSV";

function App() {
  useEffect(() => {
    fetch("/trade_log.csv")
      .then((res) => res.text())
      .then((text) => {
        const trades = parseCSV(text);
        console.log("Parsed Trades:", trades); // just gonna log the data first
      })
      .catch((err) => console.error("Error loading CSV:", err));
  }, []);

  return (
    <div>
      <h1>Trading Dashboard</h1>
    </div>
  );
}

export default App;
