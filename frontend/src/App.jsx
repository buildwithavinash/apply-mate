import { Navigate, Route, Routes } from "react-router-dom"
import BottomBar from "./components/BottomBar"
import JobsMenu from "./pages/JobsMenu"
import AddJob from "./pages/AddJob"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <>
    <Navbar/>
    <BottomBar />
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to='/dashboard' replace />}/>
        <Route path="/jobsmenu" element={<JobsMenu/>}/>
        <Route path="/createjob" element={<AddJob/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
