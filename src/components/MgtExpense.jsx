import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './MgtExpense.css';
import '../assets/css/global.css';
import { Pagination } from 'antd';

const showTotal = (total) => `Total ${total} items`;

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
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = employees.map((item) => item.employeeId);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const gotoRqt = () => {
    console.log("gotoRqt");
    navigate('/react/RqtExpense');

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
      const response = await axios.get('http://localhost:8080/react/EmployeeList', {
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
      <div>
        <div className="search-fields" >
          <span className='search-label'>社員ID:</span>
          <input
            type="text"
            placeholder="社員IDを入力してください"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
          <span className='search-label'>社員名:</span><input
            type="text"
            placeholder="社員名を入力してください"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
        </div>
        <div className="search-fields">
          <span className='search-label'>部門:</span>
          <select className='search-select'
            value={paramPosition}
            onChange={(e) => setParamPosition(e.target.value)}
          >
            <option value=""></option>
            <option value="1">部門1</option>
            <option value="2">部門2</option>
            <option value="3">部門3</option>
          </select>

          <span className='search-label'>職務:</span>
          <select className='search-select'
            value={paramDepartment}
            onChange={(e) => setParamDepartment(e.target.value)}
          >
            <option value=""></option>
            <option value="1">職務1</option>
            <option value="2">職務2</option>
            <option value="3">職務3</option>
          </select>

          <span className='search-label'>処理状態:</span>
          <select className='search-select'
            value={paramDepartment}
            onChange={(e) => setParamDepartment(e.target.value)}
          >
            <option value=""></option>
            <option value="1">承認まち</option>
            <option value="2">承認済み</option>
            <option value="3">承認不可</option>
            <option value="3">清算中</option>
            <option value="3">清算済み</option>
          </select>
        </div>

        <div className='search-fields'>
          <div className='search-label'>
            <span>日付指定:</span>
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
        </div>
        <div className="search-fields">
          <div className='margin-bottom-20'>

            <button id="btn" onClick={fetchEmployees}>検索</button>
            <button id="btn" className='margin-left-50' onClick={gotoRqt}>申請</button>
            <button id="btn" className='margin-left-50' onClick={fetchEmployees}>一括承認</button>
          </div>
        </div>
      </div>

      <div className='margin-bottom-20'>
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

                <td>ヤマダ電機</td>
                <td>ビックカメラ</td>
                <td>ヨドバシカメラ</td>
                <td>社員A</td>
                <td>部門1</td>
                <td>職務1</td>
                <td>2024-07-23</td>
                <td>30000</td>
                <td>承認まち</td>
                <td>30000</td>
                <td>
                  <button>取り消し</button>
                  <button>承認</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination total={50} showSizeChanger showQuickJumper />
    </div>
  );
};

export default ExpenseList;
