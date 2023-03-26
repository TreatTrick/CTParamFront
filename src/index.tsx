import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './UI/login';
import InfoFilling from './UI/infoFilling';
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import DashBoard from './UI/dashBoard';
import ErrorPage from './UI/errorPage';
import Copyright from './UI/copyRight';
import { Typography } from '@mui/material';
import CustomizedTables from './UI/dashboardChildren/userManage';
import StickyHeadTable from './UI/dashboardChildren/userManage';
import AccountSettings from './UI/dashboardChildren/account';

const router = createBrowserRouter([
    {
      path: "/",
      children:[
        {
          index: true,
          element: <InfoFilling/>
        },
        {
            path:"auth/",
            children:[
              {
                path:"login",
                element:<SignIn/>,
              }
            ],
        },
        {
          path:"admin/", 
          element:<DashBoard/>,        
          children:[
            {
              errorElement:<ErrorPage/>,
              children:[
                {
                  path:"usermanage",  
                  element:<StickyHeadTable/>        
                },
                {
                  path:"verify",  
                  element:<Typography>verify</Typography>          
                },
                {
                  path:"content",
                  element:<Typography>content</Typography>
                },
                {
                  path:"account",
                  element:<AccountSettings/>
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
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
