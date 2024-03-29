import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from "react-router-dom";
import JsonFileUploader from './jsonFileUploader';
import { useEffect } from 'react';
import axios from 'axios';

const handleJsonUpload = (data: any) => {
  console.log('JSON data uploaded:', data);
};


export default function InfoFilling(){
    return <JsonFileUploader onJsonUpload={handleJsonUpload}/> 
}