import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SalaryMgt.css";

const ShainIchiran = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paramName, setParamName] = useState("");
  const [paramBirthday, setParamBirthday] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [paramDepartment, setParamDepartment] = useState("");
  const [paramPosition, setParamPosition] = useState("");
  const [paramID, setParamID] = useState("");
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/react/EmployeeList",
        {
          params: {
            name: paramName,
            birthday: paramBirthday,
          },
        }
      );

      if (response.data.error) {
        setBusinessError(response.data.error);
        setEmployees([]);
      } else {
        setEmployees(response.data.results);
        setBusinessError("");
      }

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="shain-ichiran">
      <h2>給料管理</h2>
      {businessError && <p className="error-message">{businessError}</p>}
      <div className="search-fields">
        <input
          type="date"
          value={paramBirthday}
          onChange={(e) => setParamBirthday(e.target.value)}
        />
        <span className="select">部門：</span>
        <select
          value={paramPosition}
          onChange={(e) => setParamPosition(e.target.value)}
        >
          <option value=""></option>
          <option value="1">部門1</option>
          <option value="2">部門2</option>
          <option value="3">部門3</option>
        </select>

        <span className="select">職務：</span>
        <select
          value={paramDepartment}
          onChange={(e) => setParamDepartment(e.target.value)}
        >
          <option value=""></option>
          <option value="1">職務1</option>
          <option value="2">職務2</option>
          <option value="3">職務3</option>
        </select>
        <input
          type="text"
          placeholder="社員名で検索"
          value={paramName}
          onChange={(e) => setParamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="社員IDを入力してください"
          value={paramID}
          onChange={(e) => setParamID(e.target.value)}
        />
        <button id="btn">給料計算</button>
        <button id="btn">控除設定</button>
        <button id="btn">クリア</button>
        <button id="btn" onClick={fetchEmployees}>
          再検索
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>社員ID</th>
              <th>社員名</th>
              <th>勤怠</th>
              <th>支給</th>
              <th>控除</th>
              <th>その他</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{"勤怠"}</td>
                <td>{"支給"}</td>
                <td>{"控除"}</td>
                <td>{"その他"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShainIchiran;
