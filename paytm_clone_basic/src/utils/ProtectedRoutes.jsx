import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes(){
    let isTokenAvailable = localStorage.getItem("token");
    return (isTokenAvailable!=undefined || isTokenAvailable!=null) ? <Outlet></Outlet> : <Navigate to={"/sign-in"}></Navigate>
}