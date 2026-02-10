import Register from "./pages/Register.jsx";
import React from "react";
import Login from "./pages/Login.jsx";
import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ProtecteRoute from "./components/ProtectedRoute.jsx";
function App(){
  return(
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={
        <ProtecteRoute>
        <Dashboard/>
        </ProtecteRoute>
      }/>
    </Routes>
  )
}
export default App;