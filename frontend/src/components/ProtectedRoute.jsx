import { Children } from "react";
import { Navigate } from "react-router-dom";
const ProtecteRoute=({children})=>{
    const token=localStorage.getItem("token");
    if(!token){
        return <Navigate to="/login" replace/>
    }
    return children
}
export default ProtecteRoute;