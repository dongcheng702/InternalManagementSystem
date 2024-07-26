import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import './RqtExpense.css';
import '../assets/css/global.css';
import { UploadOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Upload, Form, Input } from 'antd';


const ExpenseList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [businessError, setBusinessError] = useState('');
  const [paramName, setParamName] = useState('');
  const [paramPosition, setParamPosition] = useState('');
  const navigate = useNavigate();

  //追加输入框
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };


  const props = {
    // 文件上传的目标 URL
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
  };

  const back = () => {
    console.log("back");
    navigate('/react/MgtExpense');

  };

  useEffect(() => {
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="shain-ichiran">
      <h2>経費申請画面</h2>
      {businessError && <p className="error-message">{businessError}</p>}
      <div className='margin-bottom-20'>
        <div className="search-fields">
          <span className='search'>職務:</span>
          <input
            type="text"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
          <span className='search'>社員ID:</span>
          <input
            type="text"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="search-fields">
          <span className='search'>部門:</span>
          <input
            type="text"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
          <span className='search'>名前:</span>
          <input
            type="text"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="search-fields">
          <span className='search'>費用名:</span>
          <select className='search-select'
            value={paramPosition}
            onChange={(e) => setParamPosition(e.target.value)}
          >
            <option value=""></option>
            <option value="1">タクシー代</option>
            <option value="2">飲食代</option>
            <option value="3">旅行費</option>
            <option value="3">定期券</option>
          </select>
          <span className='search'>発生日:</span>
          <input
            type="text"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
        </div>
      </div>
      <div className="search-fields">
        <span className='search'>申請金額:</span>
        <input
          type="text"
          value={paramName}
          onChange={(e) => setParamName(e.target.value)}
        />

        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>

      </div>
      <div className='centerYori'>

        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
          <Form.List
            name="names"
          // rules={[
          //   {
          //     validator: async (_, names) => {
          //       if (!names || names.length < 2) {
          //         return Promise.reject(new Error('At least 2 passengers'));
          //       }
          //     },
          //   },
          // ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <div className="search-fields">
                    <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      // label={index === 0 ? 'Passengers' : ''}
                      required={false}
                      key={field.key}
                    >

                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >

                        <div className="search-fields">
                          <span className='search'>費用名:</span>
                          <select className='search-select'
                            value={paramPosition}
                            onChange={(e) => setParamPosition(e.target.value)}
                          >
                            <option value=""></option>
                            <option value="1">タクシー代</option>
                            <option value="2">飲食代</option>
                            <option value="3">旅行費</option>
                            <option value="3">定期券</option>
                          </select>
                          <span className='search'>発生日:</span>
                          <input
                            type="text"
                            value={paramName}
                            onChange={(e) => setParamName(e.target.value)}
                          />

                        </div>
                        <div className="search-fields">
                          <span className='search'>申請金額:</span>
                          <input
                            type="text"
                            value={paramName}
                            onChange={(e) => setParamName(e.target.value)}
                          />

                          <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                          </Upload>

                        </div>
                      </Form.Item>
                      {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  </div>
                ))}
                <div className="search-fields">
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}

                      icon={<PlusCircleOutlined />}

                    >
                      <span>費用申請追加</span>
                    </Button>
                    <Form.ErrorList errors={errors} />

                  </Form.Item>
                </div>
              </>
            )}
          </Form.List>
        </Form>

        <div className="search-fields">
          <span className='search'>総金額:</span>
          <input
            type="text"
            value={paramName}
            onChange={(e) => setParamName(e.target.value)}
          />
        </div>
      </div>
      <div className='search-fields'>
        <button>申請</button>
        <button onClick={back}>戻る</button>
      </div>
    </div>

  );
};

export default ExpenseList;

