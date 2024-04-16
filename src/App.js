import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Converter from './components/Converter';
import QuestionLayout from './components/question/QuestionLayout';
// import PreviewPage from "./PreviewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Converter />} />
        {/* <Route path="/preview" element={<PreviewPage />} /> */}
        <Route path="/qlayout" element={<QuestionLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
