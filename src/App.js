import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Organizations from "./pages/organizations";
import Organization from "./pages/organization";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Organizations />} />
        <Route path="/organization/:org" element={<Organization />} />
      </Routes>
    </Router>
  );
}

export default App;
