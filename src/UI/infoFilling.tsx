import * as React from "react";
import { Navigate } from "react-router-dom";

// export async function loader(): Promise<Response>{
//     const token = localStorage.getItem('token');
//     token ? null : 
// }

export default function InfoFilling(){

    const token = localStorage.getItem('token');
    if(token){
        return (
            <h1>this is InfoFilling page.</h1>
        );
    }
    else{
        return <Navigate to = 'auth/login'/>
    }
    
}