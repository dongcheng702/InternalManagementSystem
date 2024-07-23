import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustMgt.css';
import { useHistory } from 'react-router-dom';

const ShainIchiran = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paramName, setParamName] = useState('');
  const [paramBirthday, setParamBirthday] = useState('');
  const [businessError, setBusinessError] = useState('');

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/react/WorkHourList', {
        params: {
          name: paramName,
          birthday: paramBirthday
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

  const previousPage = "/react/CustBankMgt";

  function goback(){
    console.log("goback");
  }

  return (
    <div className="kokyaku-kanri">
      <h2>顧客口座管理</h2>
      {businessError && <p className="error-message">{businessError}</p>}
      {/* <div className="search-fields"> */}
      <div className='kokyaku-info'>
        <div>
          <table>
            <thead>
              <tr>
                <td>会社名</td>
                <td></td>
                <td>部門名</td>
                <td></td>
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
            </tbody>
          </table>
        </div>

        {/* <input
          type="date"
          value={paramBirthday}
          onChange={(e) => setParamBirthday(e.target.value)}
        /> */}

      </div>
      <br></br>
      <div className='bank-account'>
        <table>
          <thead>
            <tr>
              <td rowSpan={3}>#</td>
              <th>金融機関名</th>
              <td></td>
              <th>口座名義</th>
              <td></td>
              <td rowSpan={3}>
               <button id="edit-account" onClick={fetchEmployees}>変更</button>
              </td>
            </tr>
            <tr>
              <th>支店名</th>
              <td></td>
              <th>口座番号</th>
              <td></td>
            </tr>
            <tr>
              <th>備考</th>
              <td colSpan={3}></td>
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
          </tbody>
        </table>
      </div>
      <br/>
      <div  className='manage-button'>
        <button id="previous" onClick={goback()}>戻る</button>
      </div>
    </div>
  );
};

export default ShainIchiran;
