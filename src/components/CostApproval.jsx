import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MgtExpense.css';

const ExpenseList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paramName, setParamName] = useState('');
  const [paramFirstDay, setParamFirstDay] = useState('');
  const [paramLastDay, setParamLastDay] = useState('');
  const [paramDepartment, setParamDepartment] = useState('');
  const [paramPosition, setParamPosition] = useState('');
  const [businessError, setBusinessError] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = employees.map((item) => item.employeeId);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/react/WorkHourList', {
        params: {
          name: paramName,
          FirstDay: paramFirstDay,
          LastDay: paramLastDay
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
    <div className="shain-ichiran">
      <h2>経費管理一覧</h2>
      {businessError && <p className="error-message">{businessError}</p>}
     
      <div className='select-div'>
        <span className="select">日付指定：</span>
        <input
          type="date"
          placeholder="最初日を選択してください"
          value={paramFirstDay}
          onChange={(e) => setParamFirstDay(e.target.value)}
        /><span>~</span> 
        <input
          type="date"
          placeholder="最終日を選択してください"
          value={paramLastDay}
          onChange={(e) => setParamLastDay(e.target.value)}
        />


      </div>


      <div className='select-div'>
          <button id="btn" className='select' onClick={fetchEmployees}>検索</button>
          <button id="btn" className='select' onClick={fetchEmployees}>申請</button>
          <button id="btn" className='select' onClick={fetchEmployees}>一括承認</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === employees.length}
                />
              </th>
              <th>会社名</th>
              <th>経費申請ID</th>
              <th>社員ID</th>
              <th>社員名</th>
              <th>部門</th>
              <th>職務</th>
              <th>申請日</th>
              <th>申請金額</th>
              <th>処理状態</th>
              <th>精算金額</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.employeeId}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectRow(e, employee.employeeId)}
                    checked={selectedRows.includes(employee.employeeId)}
                    />
                </td>

                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.mail}</td>
                <td>{employee.birthday}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                <button>取り消し</button>
                <button>承認</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <span className='margin-left-20'>合計件数</span>
      <span className='margin-left-100'>表示件数/頁</span>
      <span className='margin-left-20'> &lt; 1 2 3... &gt;</span>
      <span className='margin-left-50'> ( 1 )頁へ</span>
    </div>
  );
};

export default ExpenseList;
