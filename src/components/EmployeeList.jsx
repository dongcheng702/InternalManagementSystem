import React, { useState, useEffect } from "react";
import axios from "axios";

const ShainIchiran = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paramName, setParamName] = useState("");
  const [paramBirthday, setParamBirthday] = useState("");
  const [businessError, setBusinessError] = useState("");

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
      <h2>社員一覽</h2>
      {businessError && <p className="error-message">{businessError}</p>}
      <div className="search-fields">
        <input
          type="text"
          placeholder="社員名で検索"
          value={paramName}
          onChange={(e) => setParamName(e.target.value)}
        />
        <input
          type="date"
          value={paramBirthday}
          onChange={(e) => setParamBirthday(e.target.value)}
        />
        <button id="btn" onClick={fetchEmployees}>
          再検索
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>社員ID</th>
              <th>名前</th>
              <th>メール</th>
              <th>誕生日</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.mail}</td>
                <td>{employee.birthday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShainIchiran;
