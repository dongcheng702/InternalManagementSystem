// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import EmployeeList from "./components/EmployeeList";
import WorkHourList from "./components/WorkHourList";
import CostManagement from "./components/CostManagement";
import SalaryMgt from "./components/SalaryMgt";
import "./assets/css/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/menu" element={<div>Menu Content</div>} />{" "}
          {/* Load only the content */}
          <Route path="/react/EmployeeList" element={<EmployeeList />} />
          <Route path="/react/WorkHourList" element={<WorkHourList />} />
          <Route path="/react/CostManagement" element={<CostManagement />} />
          <Route path="/react/SalaryMgt" element={<SalaryMgt />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
