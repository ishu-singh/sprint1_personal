import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Converter from './components/Converter';
import QuestionLayout from './components/QuestionLayout';

function App() {
  return (
    <>
      
      <Router>
        <Routes>

          <Route path='/upload' exact element={<Converter/>}/>
          <Route path='/qlayout' exact element={<QuestionLayout/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
