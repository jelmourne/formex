import { createRoot } from "react-dom/client";
import { HashRouter as Router, Route, Routes } from "react-router";

import TitleBar from "./components/TitleBar";

import Home from "./pages/Home";
import ToolingEquivList from "./pages/ToolingEquivList";
import ToolingEquiv from "./pages/CalibrationCert";
import CalibrationCertList from "./pages/CalibrationCertList";
import CalibrationCert from "./pages/CalibrationCert";
import Splashscreen from "./pages/Splashscreen";

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleBar />}>
          <Route index element={<Home />} />
          <Route path="/tooling_equivalence" element={<ToolingEquivList />} />
          <Route path="/tooling_equivalence/:id" element={<ToolingEquiv />} />
          <Route
            path="/calibration_certificate"
            element={<CalibrationCertList />}
          />
          <Route
            path="/calibration_certificate/:id"
            element={<CalibrationCert />}
          />
        </Route>
        <Route path="/splashscreen" element={<Splashscreen />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
