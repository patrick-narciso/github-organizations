import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Organizations from "./pages/organizations";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Organizations />} />
      </Routes>
    </Router>
  );
}

export default App;
