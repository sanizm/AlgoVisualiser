import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { InsertionSort } from "./pages/InsertionSort";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/InsertionSort" element={<InsertionSort />} />
    </Routes>
  );
}

export default App;
