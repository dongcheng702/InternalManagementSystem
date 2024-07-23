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
      <div className="search-container">
        <div className="search-group">
          <div className="input-group">
            <input
              type="date"
              className="search-date"
              value={paramBirthday}
              onChange={(e) => setParamBirthday(e.target.value)}
            />
            <span className="search-label margin-left-20">部門:</span>
            <select
              className="search-select"
              value={paramPosition}
              onChange={(e) => setParamPosition(e.target.value)}
            >
              <option value=""></option>
              <option value="1">部門1</option>
              <option value="2">部門2</option>
              <option value="3">部門3</option>
            </select>
            <span className="search-label margin-left-20">職務:</span>
            <select
              className="search-select"
              value={paramDepartment}
              onChange={(e) => setParamDepartment(e.target.value)}
            >
              <option value=""></option>
              <option value="1">職務1</option>
              <option value="2">職務2</option>
              <option value="3">職務3</option>
            </select>
            <button className="search-button margin-left-20">給料計算</button>
            <button className="search-button">控除設定</button>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="社員名"
              className="search-input"
              value={paramName}
              onChange={(e) => setParamName(e.target.value)}
            />
            <input
              type="text"
              placeholder="社員ID"
              className="search-input margin-left-20"
              value={paramID}
              onChange={(e) => setParamID(e.target.value)}
            />
            <button className="search-button margin-left-85">クリア</button>
            <button className="search-button" onClick={fetchEmployees}>
              再検索
            </button>
          </div>
        </div>
      </div>

      <div>
        <table className="kr-table">
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
              <div key={employee.employeeId} className="description-list">
                <dl>
                  <dt>社員ID</dt>
                  <dd>{employee.employeeId}</dd>
                  <dt>社員名</dt>
                  <dd>{employee.name}</dd>
                  <dt>勤怠</dt>
                  <dd>{"勤怠"}</dd>
                  <dt>支給</dt>
                  <dd>{"支給"}</dd>
                  <dt>控除</dt>
                  <dd>{"控除"}</dd>
                  <dt>その他</dt>
                  <dd>{"その他"}</dd>
                </dl>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShainIchiran;
