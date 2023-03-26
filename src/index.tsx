import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './UI/login';
import InfoFilling from './UI/infoFilling';
import { createBrowserRouter, Navigate, redirect, RouterProvider } from "react-router-dom";
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
    path: "account",
    name: "账户设置",
    icon: <ManageAccountsIcon />,
  }
];

const userlist: DashBoardListItem[] = [
  {
    path: "infofilling",
    name: "数据上传",
    icon: <ListAltIcon />,
  },
  {
    path: "account",
    name: "账户设置",
    icon: <ManageAccountsIcon />,
  }
];

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "main/",
        element: <DashboardContent BoardName='' BoardListItems={userlist} />,
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
        path: "auth/",
        children: [
          {
            path: "login",
            element: <SignIn />,
          }
        ],
      },
      {
        path: "admin/",
        element: <DashboardContent BoardName='' BoardListItems={adminList} />,
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
                path: "account",
                element: <AccountSettings />
              }
            ],
          },
        ],
      }
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
