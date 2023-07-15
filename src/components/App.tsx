import Table from "./Table";
import wineJsonData from '../wine_data.json';
import { calculateMeasureOfCetralTendency, populateGammaFieldInDataset } from "../utils/measure";

function App() {

  const flavanoidsCentralTendency = calculateMeasureOfCetralTendency(wineJsonData, 'Flavanoids');
  
  populateGammaFieldInDataset(wineJsonData);
  const gammaCentralTendency = calculateMeasureOfCetralTendency(wineJsonData, 'Gamma');

  return (
    <div className="App">
      <Table centralTendencyData={flavanoidsCentralTendency} propertyLabel="Flavanoids" />
      <Table centralTendencyData={gammaCentralTendency} propertyLabel="Gamma" />
    </div>
  );
}

export default App;
