import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustMgt.css';

const Kokyakukanri = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paramName, setParamName] = useState('');
  // const [paramBirthday, setParamBirthday] = useState('');
  const [businessError, setBusinessError] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/react/WorkHourList', {
        params: {
          // name: paramName,
          // birthday: paramBirthday
        }
      });

      if (response.data.error) {
        setBusinessError(response.data.error);
        setEmployees([]);
      } else {
        setEmployees(response.data.results);
        setBusinessError('');
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
    <div className="kokyaku-kanri">
      <h2>顧客管理</h2>
      {businessError && <p className="error-message">{businessError}</p>}
      <div className="search-bar">
        <div>
          <h4>検索条件</h4>
        </div>
        <div>
          <div>
            <table>
              <tr>
                <td>顧客ID</td>
                <td>
                  <input
                    type="text"
                    placeholder="顧客IDで検索"
                    value={paramName}
                    onChange={(e) => setParamName(e.target.value)}
                  />
                  </td>
                <td>法人番号</td>
                <td>
                  <input
                    type="text"
                    placeholder="法人番号で検索"
                    value={paramName}
                    onChange={(e) => setParamName(e.target.value)}
                  />
                  </td>
              </tr>
              <tr>
                <td>会社名</td>
                <td>
                  <input
                    type="text"
                    placeholder="会社名で検索"
                    value={paramName}
                    onChange={(e) => setParamName(e.target.value)}
                  />
                  </td>
                <td>部門名</td>
                <td>
                  <input
                    type="text"
                    placeholder="部門名で検索"
                    value={paramName}
                    onChange={(e) => setParamName(e.target.value)}
                  />
                  </td>
              </tr>

            </table>
          </div>

          {/* <input
            type="date"
            value={paramBirthday}
            onChange={(e) => setParamBirthday(e.target.value)}
          /> */}
          <div className='search-bar-button'>
            <button id="btn" onClick={fetchEmployees}>リセット</button>
            <button id="btn" onClick={fetchEmployees}>検索</button>
          </div>

        </div>
      </div>
      <br/>
      <div className="result-fields">
        <div><h4>検索結果</h4></div>
        <div>
          <table>
            <thead>
              <tr>
                <th>顧客ID</th>
                <th>法人番号</th>
                <th>会社名</th>
                <th>部門名</th>
                <th>詳細情報</th>
              </tr>
            </thead>
            <tbody>
              {/* {employees.map(employee => (
                <tr key={employee.employeeId}>
                  <td>{employee.employeeId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.mail}</td>
                  <td>{employee.birthday}</td>
                </tr>
              ))} */}
              <tr>
                <td>customer.customer_id</td>
                <td>customer.customer_serial</td>
                <td>customer.customer_name</td>
                <td>customer.customer_dep_name</td>
                <td><a href='/react/CustMgtDetail'>チェック</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Kokyakukanri;
