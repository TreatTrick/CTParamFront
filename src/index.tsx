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
import Account from './UI/dashboardChildren/accountSetting';

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
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get(config.is_login);
      if (res.status === 200) {
        if (res.data.is_admin) {
          navigate('/admin/usermanage');
        } 
        else{
          navigate('/infofilling');
        }
      } 
    } catch (err) {
      console.log(err);
      navigate('/auth/login');
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (<DashboardContent BoardName='' BoardListItems={userlist} defaultOpen={false}/>);
};


const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get(config.is_login);
      if (res.status === 200) {
        if (res.data.is_admin) {
          navigate('/admin/usermanage');
        } 
        else{
          navigate('/infofilling');
        }
      } 
    } catch (err) {
      console.log(err);
      navigate('/auth/login');
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (<DashboardContent BoardName='' BoardListItems={adminList} defaultOpen={true}/>);
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
        element: <Account />
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
    element: <AdminPage />,
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
            element: <Account />
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
