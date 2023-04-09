import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './UI/login';
import InfoFilling from './UI/infoFilling';
import { createBrowserRouter, Navigate, redirect, RouterProvider, useNavigate } from "react-router-dom";
import DashBoard from './UI/dashBoard';
import ErrorPage from './UI/errorPage';
import Copyright from './UI/copyRight';
import { Typography } from '@mui/material';
import CustomizedTables from './UI/dashboardChildren/userManage';
import StickyHeadTable from './UI/dashboardChildren/userManage';
import AccountSettings from './UI/dashboardChildren/account';
import DashboardContent from './UI/dashBoard';
import { DashBoardListItem } from './UI/dashBoard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import config from './functionality/frontend_config.json';
import api from './functionality/axiosInstance';

const adminList: DashBoardListItem[] = [
  {
    path: "usermanage",
    name: "用户管理",
    icon: <PeopleAltIcon />,
  },
  {
    path: "verify",
    name: "内容审核",
    icon: <ListAltIcon />,
  },
  {
    path: "content",
    name: "内容查寻",
    icon: <ViewListIcon />,
  },
  {
    path: "infofilling",
    name: "数据上传",
    icon: <UploadFileIcon />,
  },
  {
    path: "account",
    name: "账户设置",
    icon: <ManageAccountsIcon />,
  }
];

const userlist: DashBoardListItem[] = [
  {
    path: "infofilling",
    name: "数据上传",
    icon: <UploadFileIcon />,
  },
  {
    path: "account",
    name: "账户设置",
    icon: <ManageAccountsIcon />,
  }
];

const RootPage: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  
  const fetchData = async () => {
    try {
      const res = await api.get(config.is_login);
      if (res.status === 200) {
        setIsLogin(true);
        setIsAdmin(res.data.is_admin);
      } else {
        setIsLogin(false);
      }
    } catch (err) {
      setIsLogin(false);
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [isLogin, isAdmin]);

  return (
    <>
      {isLogin ? (
        isAdmin ? (
          <Navigate to="/admin/usermanage" replace />
        ) : (
          <DashboardContent BoardName='' BoardListItems={userlist} defaultOpen={false}/>
        )
      ) : (
        <Navigate to="/auth/login" replace />
      )}
    </>
  );

};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "infofilling",
        element: <InfoFilling />
      },
      {
        path: "account",
        element: <AccountSettings />
      }
    ],
  },
  {
    path: "/auth/",
    children: [
      {
        path: "login",
        element: <SignIn />,
        errorElement: <ErrorPage />,
      }
    ],
  },
  {
    path: "/admin/",
    element: <DashboardContent BoardName='' BoardListItems={adminList} defaultOpen={true}/>,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "usermanage",
            element: <StickyHeadTable />
          },
          {
            path: "verify",
            element: <Typography>verify</Typography>
          },
          {
            path: "content",
            element: <Typography>content</Typography>
          },
          {
            path: "infofilling",
            element: <InfoFilling/>
          },
          {
            path: "account",
            element: <AccountSettings />
          }
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
