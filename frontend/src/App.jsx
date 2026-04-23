import { Navigate, Route, Routes } from "react-router-dom"
import BottomBar from "./components/BottomBar"
import JobsMenu from "./pages/JobsMenu"
import AddJob from "./pages/AddJob"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
    <Navbar/>
    <BottomBar />
    <Routes>
      <Route path="/" element={<Navigate to='/dashboard' />}/>
      <Route path="/jobsmenu" element={<JobsMenu/>}/>
      <Route path="/createjob" element={<AddJob/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App