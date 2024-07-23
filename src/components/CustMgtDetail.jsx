import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustMgt.css';

const Kokyakukanri = () => {
  const [contacts, setcontacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paramName, setParamName] = useState('');
  // const [paramBirthday, setParamBirthday] = useState('');
  const [businessError, setBusinessError] = useState('');

  const fetchcontacts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/react/WorkHourList', {
        params: {
          // name: paramName,
          // birthday: paramBirthday
        }
      });

      if (response.data.error) {
        setBusinessError(response.data.error);
        setcontacts([]);
      } else {
        setcontacts(response.data.results);
        setBusinessError('');
      }

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcontacts();
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
          <h4>詳細情報</h4>
        </div>
        <div>
          <div className='kokyaku-info'>
            <table>
              <tr>
                <td>顧客ID</td>
                <td>

                </td>
                <td>法人番号</td>
                <td>

                </td>
              </tr>
              <tr>
                <td>会社名</td>
                <td>

                </td>
                <td>会社電話</td>
                <td>

                </td>
              </tr>
              <tr>
                <td>部門名</td>
                <td>

                </td>
                <td>部門電話</td>
                <td>

                </td>
              </tr>
              <tr>
                <td>部門所在地</td>
                <td></td>
              </tr>
            </table>
          </div>

          {/* <input
            type="date"
            value={paramBirthday}
            onChange={(e) => setParamBirthday(e.target.value)}
          /> */}
          <div className='manage-button'>
              <button id="btn" onClick={fetchcontacts}>顧客変更</button>
          </div>
        </div>
      </div>
      <br/>
      <div className="result-fields">
        <div>
          <table>
            <thead>
              <tr>
                <th>責任者氏名</th>
                <th>メール</th>
                <th>連絡電話</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {/* {contacts.map(contact => (
                <tr key={contact.contactId}>
                  <td>{contact.name}</td>
                  <td>{contact.mail}</td>
                  <td>{contact.tel}</td>
                  <td>
                    <button id="btn" onClick={fetchcontacts}>変更</button>
                  </td>
                </tr>
              ))} */}
                  <tr >
                  <td>contact.name</td>
                  <td>contact.mail</td>
                  <td>contact.tel</td>
                  <td>
                    <button class="control" id='contact-edit' onClick={fetchcontacts}>変更</button>
                    <button class="control" id='contact-del' onClick={fetchcontacts}>削除</button>
                  </td>
                </tr>
            </tbody>
          </table>
          <br/>
          <div  class='manage-button'>
            <button id="btn" onClick={fetchcontacts}>責任者追加</button>
          </div>
          <div  class='manage-button'>
            <button id="previous" onClick={fetchcontacts}>戻る</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kokyakukanri;
