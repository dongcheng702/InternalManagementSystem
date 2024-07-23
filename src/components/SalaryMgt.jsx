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
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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
              <tr key={employee.employeeId}>
                <td>
                  <div className="description-list">
                    <dl>
                      <dt>{employee.employeeId}</dt>
                    </dl>
                  </div>
                </td>
                <td>
                  <div className="description-list">
                    <dl>
                      <dt>{employee.name}</dt>
                    </dl>
                  </div>
                </td>
                <td>
                  <div className="description-list">
                    <dl className="search-group">
                      <dt>出勤日数</dt>
                      <dd>{20}</dd>
                      <dt>勤務時間</dt>
                      <dd>{"168:00:00"}</dd>
                    </dl>
                    <dl className="search-group">
                      <dd>{20}</dd>
                      <dd>{"168:00:00"}</dd>
                    </dl>
                  </div>
                </td>
                <td>
                  <div className="description-list">
                    <dl>
                      <dt>基本給料</dt>
                      <dd>{500000}</dd>
                      <dt>残業手当</dt>
                      <dd>{0}</dd>
                      <dt>住宅手当</dt>
                      <dd>{0}</dd>
                      <dt>通勤手当</dt>
                      <dd>{10000}</dd>
                      <dt>その他手当</dt>
                      <dd>{0}</dd>
                      <dt>支払総額</dt>
                      <dd>{510000}</dd>
                    </dl>
                  </div>
                </td>
                <td>
                  <div className="description-list">
                    <dl>
                      <dt>健康保険料</dt>
                      <dd>{24900}</dd>
                      <dt>厚生年金保険料</dt>
                      <dd>{44570}</dd>
                      <dt>雇用保険料</dt>
                      <dd>{2040}</dd>
                      <dt>社会保険料合計</dt>
                      <dd>{71510}</dd>
                      <dt>源泉所得税</dt>
                      <dd>{19690}</dd>
                      <dt>控除額合計</dt>
                      <dd>{91200}</dd>
                    </dl>
                  </div>
                </td>
                <td>
                  <div className="description-list">
                    <dl>
                      <dt>差引支払額</dt>
                      <dd>{418800}</dd>
                    </dl>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShainIchiran;
