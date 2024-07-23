import React from "react";
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./Menu.css";
import companyLogo from "../assets/companyLogo.png"; // 确保路径正确

const Menu = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "社員",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "社員一覧",
          icon: "pi pi-fw pi-file",
          command: () => {
            navigate("/react/EmployeeList");
          },
        },
        {
          label: "Images",
          icon: "pi pi-fw pi-image",
        },
      ],
    },
    {
      label: "勤怠",
      icon: "pi pi-fw pi-stopwatch",
      items: [
        {
          label: "勤怠一覧",
          icon: "pi pi-fw pi-file",
          command: () => {
            navigate("/react/WorkHourList");
          },
        },
        {
          label: '勤怠記録',
          icon: 'pi pi-fw pi-pencil'
        }
      ]
    },
    {
      label: "費用",
      icon: "pi pi-fw pi-credit-card",
      items: [
        {
          label: '経費管理',
          icon: 'pi pi-fw pi-ethereum',
          command: () => { navigate('/react/MgtExpense'); }
        },
        {
          label: '経費申請',
          icon: 'pi pi-fw pi-file',
          command: () => { navigate('/react/RqtExpense'); }
        },
        {
          label: '費用承認',
          icon: 'pi pi-fw pi-file',
          command: () => { navigate('/react/CostApproval'); }
        }
      ]
    },
    {
      label: "給料",
      icon: "pi pi-wallet",
      items: [
        {
          label: "給料管理",
          icon: "pi pi-fw pi-file",
          command: () => {
            navigate("/react/SalaryMgt");
          },
        },
      ],
    },
  ];

  return (
    <div className="menu-container">
      <div className="header">
        <img src={companyLogo} alt="会社ロゴ" className="company-logo" />
        <h1 className="system-title">社員管理システム</h1>
      </div>
      <PanelMenu model={items} className="custom-panelmenu" />
    </div>
  );
};

export default Menu;
