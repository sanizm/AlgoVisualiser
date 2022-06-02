import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { InsertionSort } from "./pages/InsertionSort";
import { QuickSort } from "./pages/QuickSort";
import { BubbleSort } from "./pages/BubbleSort";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/InsertionSort" element={<InsertionSort />} />
      <Route path="/QuickSort" element={<QuickSort />} />
      <Route path="/BubbleSort" element={<BubbleSort />} />
    </Routes>
  );
}

export default App;
